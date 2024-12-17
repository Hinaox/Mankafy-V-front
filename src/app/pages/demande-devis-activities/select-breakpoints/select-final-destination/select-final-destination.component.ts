import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { RouteDigraphService } from '../../../../services/route-digraph.service';
import RouteDigraph from '../../../../models/RouteDigraph';
import PlanningClient from '../../../../models/PlanningClient';
import Location from '../../../../models/Location';

import $ from 'jquery';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-select-final-destination',
  templateUrl: './select-final-destination.component.html',
  styleUrl: './select-final-destination.component.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: false,
  animations: [
    trigger('activable', [
      state('active', style({ backgroundColor: 'red' })),
      state('inactive', style({ backgroundColor: 'rgba(0,0,0,0)' })),
      transition('active <=> inactive', [animate('0.5s')]),
    ]),
  ],
})
export class SelectFinalDestinationComponent implements OnInit, OnChanges {
  routeDigraphs?: RouteDigraph[];

  @Input() planningClient?: PlanningClient;
  location?: Location;

  constructor(private routeDigraphService: RouteDigraphService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['planningClient']) {
      this.setPlanningClient(changes['planningClient'].currentValue);
    }
  }

  async loadRouteDigraphs() {
    try {
      if (!this.location?.id) throw 'undefined location.id';
      this.routeDigraphs = await this.routeDigraphService.findByLocation(
        this.location.id
      );
      if (this.routeDigraphs) {
        this.displayRouteGraphs();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async setPlanningClient(data?: PlanningClient) {
    this.planningClient = data;
    if (this.planningClient?.location) {
      this.location = this.planningClient.location;
      await this.loadRouteDigraphs();
    }
  }

  displayRouteGraphs() {
    if (this.routeDigraphs) {
      const documentElement = document.getElementById('routeDigraphsList');
      if (!documentElement) throw "undefined element 'routeDigraphsList'";
      $(documentElement).html('');
      for (let element of this.routeDigraphs) {
        const container = this.displayRouteDigraphsElement(element);
        documentElement.appendChild(container);
      }
    }
  }

  displayRouteDigraphsElement(
    routeDigraph: RouteDigraph,
    container: HTMLElement | null = null
  ) {
    const element = document.createElement('div');
    element.classList.add('routeDigraphElement');
    element.classList.add('d-flex');

    const routeDigraphBody = document.createElement('div');
    routeDigraphBody.classList.add('routeDigraphBody');
    routeDigraphBody.classList.add('d-flex');
    routeDigraphBody.classList.add('flex-column');
    routeDigraphBody.classList.add('align-self-center');
    routeDigraphBody.classList.add('justify-content-center');
    const title = document.createElement('div');
    title.classList.add('routeDigraphTitle');
    title.innerHTML = routeDigraph.name ? routeDigraph.name : '';
    routeDigraphBody.appendChild(title);
    element.appendChild(routeDigraphBody);

    const childrenContainer = document.createElement('div');
    childrenContainer.classList.add('d-flex');
    childrenContainer.classList.add('flex-column');
    childrenContainer.classList.add('justify-content-around');
    element.appendChild(childrenContainer);
    if (routeDigraph.children) {
      for (let child of routeDigraph.children) {
        this.displayRouteDigraphsElement(child, childrenContainer);
      }
    }

    if (container != null) {
      container.appendChild(element);
    }

    return element;
  }

  @Output() handleChoice = new EventEmitter<Location>();
  onDestinationChoice(location: Location) {
    this.handleChoice.emit(location);
  }
}
