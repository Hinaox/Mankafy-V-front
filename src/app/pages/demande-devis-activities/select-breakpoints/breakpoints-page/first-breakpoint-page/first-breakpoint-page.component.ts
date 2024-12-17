import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import PlanningClient from '../../../../../models/PlanningClient';
import Location from '../../../../../models/Location';
import { LocationService } from '../../../../../services/location.service';
import { duration } from 'moment';

@Component({
  selector: 'app-first-breakpoint-page',
  templateUrl: './first-breakpoint-page.component.html',
  styleUrl: './first-breakpoint-page.component.scss',
})
export class FirstBreakpointPageComponent implements OnChanges {
  @Input() planningClient?: PlanningClient;
  @Input() breakpointsRoute?: Location[];
  breakpointsRouteDistanceDurations?: {
    location: Location;
    distance: number;
    duration: number;
    arrivalTime: Date;
  }[];
  disabledBreakpointsRouteDistanceDurations?: {
    location: Location;
    distance: number;
    duration: number;
  }[];

  constructor(private locationService: LocationService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['planningClient']) {
      this.setPlanningClient(changes['planningClient'].currentValue);
    }
    if (changes['breakpointsRoute']) {
      this.setBreakpointsRoute(changes['breakpointsRoute'].currentValue);
    }
  }

  setPlanningClient(data?: PlanningClient) {
    this.planningClient = data;
  }

  setBreakpointsRoute(data?: Location[]) {
    this.breakpointsRoute = data;
    this.setBreakpointsRouteDistanceDurations();
  }

  async setBreakpointsRouteDistanceDurations() {
    if (this.breakpointsRoute) {
      this.breakpointsRouteDistanceDurations = [];
      this.disabledBreakpointsRouteDistanceDurations = [];
      for (let location of this.breakpointsRoute) {
        try {
          if (!location.id) throw 'undefined location.id';
          const distanceDuration: any =
            await this.locationService.getDistanceDuration(location.id);
          distanceDuration.location = location;
          if (distanceDuration.duration / 3600 < 10) {
            this.breakpointsRouteDistanceDurations.push(distanceDuration);
            if (!this.planningClient?.dateDepart)
              throw 'undefined component.planningClient.dateDepart';
            const arrivalTime = new Date(
              this.planningClient?.dateDepart?.toString()
            );
            arrivalTime.setHours(7);
            arrivalTime.setTime(
              arrivalTime.getTime() + distanceDuration.duration * 1000
            );
            distanceDuration.arrivalTime = arrivalTime;
          } else {
            this.disabledBreakpointsRouteDistanceDurations.push(
              distanceDuration
            );
          }
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      console.error('undefined component.breakpointsRoute');
    }
  }
}
