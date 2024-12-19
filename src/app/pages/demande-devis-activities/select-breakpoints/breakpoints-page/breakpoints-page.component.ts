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
import Activity from '../../../../models/Activity';
import { PlanningClientUtilsService } from '../../../../utils/planning-client-utils.service';
import { MessageBoxService } from '../../../../services/message-box.service';
import { LocalStorageService } from 'ngx-webstorage';

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
    private routeDigraphService: RouteDigraphService,
    private planningClientUtils: PlanningClientUtilsService,
    private messageBox: MessageBoxService,
    private localStorageService: LocalStorageService
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

  async onAddBreakpointActivities(data: {
    location: Location;
    hotel: Activity;
    activities: Activity[];
  }) {
    try {
      if (!this.planningClient) throw 'undefined component.planningClient';
      await this.planningClientUtils.addBreakpointActivities(
        this.planningClient,
        data.hotel,
        data.activities
      );
      // enregistrer
      this.localStorageService.store('devisEnCours', this.planningClient);
      this.messageBox.success('Enregistrement réussi');
    } catch (error) {
      console.error(error);
    }
  }
}
