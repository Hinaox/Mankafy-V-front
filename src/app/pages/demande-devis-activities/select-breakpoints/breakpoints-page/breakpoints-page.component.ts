import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import Location from '../../../../models/Location';
import PlanningClient from '../../../../models/PlanningClient';
import RouteDigraph from '../../../../models/RouteDigraph';
import { RouteDigraphUtilsService } from '../../../../utils/route-digraph-utils.service';
import { RouteDigraphService } from '../../../../services/route-digraph.service';

@Component({
  selector: 'app-breakpoints-page',
  templateUrl: './breakpoints-page.component.html',
  styleUrl: './breakpoints-page.component.scss',
  standalone: false,
})
export class BreakpointsPageComponent implements OnInit, OnChanges {
  @Input() finalDestination?: Location;
  @Input() planningClient?: PlanningClient;
  selectedRouteDigraph?: PlanningClient;

  ngOnInit(): void {}

  breakpoints: Location[] = [];

  breakpointsRoute?: Location[];

  routeDigraph?: RouteDigraph;

  constructor(
    private routeDigraphUtils: RouteDigraphUtilsService,
    private routeDigraphService: RouteDigraphService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['finalDestination']) {
      this.setFinalDestination(changes['finalDestination'].currentValue);
    }
    if (changes['planningClient']) {
      this.setPlanningClient(changes['planningClient'].currentValue);
    }
  }

  setFinalDestination(data?: Location) {
    this.finalDestination = data;
  }

  async setPlanningClient(data?: PlanningClient) {
    this.planningClient = data;
    this.loadRouteDigraph();
  }

  setSelectedRouteDigraph(data?: RouteDigraph) {
    try {
      this.selectedRouteDigraph = data;
      if (!this.selectedRouteDigraph)
        throw 'undefined component.selectedRouteDigraph';
      this.breakpointsRoute = this.routeDigraphUtils.extractLocations(
        this.selectedRouteDigraph
      );
    } catch (error) {
      console.error(error);
    }
  }

  async loadRouteDigraph() {
    try {
      if (!this.planningClient?.location?.id)
        throw 'undefined component.location.id';
      const fetch = await this.routeDigraphService.findByLocation(
        this.planningClient.location.id
      );
      if (fetch && fetch.length) {
        const digraph = fetch[0];
        if (!this.finalDestination)
          throw 'undefined component.finalDestination';
        const destinationGraph = this.routeDigraphUtils.findLocationInTree(
          this.finalDestination,
          digraph
        );
        if (destinationGraph == null) throw 'unable to find destinationDigraph';
        const selectedRouteDigraph = this.routeDigraphUtils.findParentTree(
          destinationGraph,
          digraph
        );
        if (selectedRouteDigraph == null)
          throw 'unable to find selectedRouteDigraph';
        this.breakpointsRoute =
          this.routeDigraphUtils.extractLocations(selectedRouteDigraph);
      } else {
        throw 'empty routeDigraph fetch result';
      }
    } catch (error) {
      console.error(error);
    }
  }
}
