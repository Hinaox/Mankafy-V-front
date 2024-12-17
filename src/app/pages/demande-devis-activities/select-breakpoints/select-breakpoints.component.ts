import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import PlanningClient from '../../../models/PlanningClient';
import Location from '../../../models/Location';
import { LocalStorageService } from 'ngx-webstorage';
import RouteDigraph from '../../../models/RouteDigraph';

@Component({
  selector: 'app-select-breakpoints',
  templateUrl: './select-breakpoints.component.html',
  styleUrl: './select-breakpoints.component.scss',
})
export class SelectBreakpointsComponent implements OnChanges {
  public readonly FINAL_DESTINATION_PAGE = 'finalDestinationPage';
  public readonly BREAKPOINTS_PAGE = 'breakpointsPage';

  page = this.FINAL_DESTINATION_PAGE;

  @Input() planningClient?: PlanningClient;

  finalDestination?: Location;
  selectedRouteDigraph?: RouteDigraph;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['planningClient']) {
      this.setPlanningClient(changes['planningClient'].currentValue);
    }
  }

  private setPlanningClient(data?: PlanningClient) {
    this.planningClient = data;
    if (this.planningClient?.finalDestination) {
      this.finalDestination = this.planningClient.finalDestination;
      this.page = this.BREAKPOINTS_PAGE;
    }
  }

  onFinalDestinationChoice(location: Location) {
    this.finalDestination = location;

    if (this.planningClient) {
      this.planningClient.finalDestination = this.finalDestination;
      this.localStorageService.store('devisEnCours', this.planningClient);
      this.page = this.BREAKPOINTS_PAGE;
    } else {
      console.error('Undefined component.planningClient');
    }
  }
}
