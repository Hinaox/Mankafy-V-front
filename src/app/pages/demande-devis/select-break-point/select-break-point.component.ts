import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import Activity from '../../../models/Activity';
import { ActivityService } from '../../../services/activity.service';
import PlanningClient from '../../../models/PlanningClient';
import { MapService } from '../../../services/map.service';
import { LatLngExpression } from 'leaflet';
import { RouteFetch } from '../../../models/Route';
import { decodePolyline } from '../../../utils/utils';

@Component({
  selector: 'app-select-break-point',
  templateUrl: './select-break-point.component.html',
  styleUrl: './select-break-point.component.scss',
})
export class SelectBreakPointComponent
  implements OnInit, OnChanges, AfterViewInit
{
  breakPoints?: Activity[];
  routeLines?: number[][];

  @Input() devisEnCours?: PlanningClient;
  @Output() handlePageChange = new EventEmitter<string>();
  @Output() handleChange = new EventEmitter<PlanningClient>();

  constructor(
    private activityService: ActivityService,
    private mapService: MapService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['devisEnCours']) {
      this.setDevisEnCours(changes['devisEnCours'].currentValue);
    }
  }

  async ngAfterViewInit(): Promise<void> {
    await this.loadBreakPoints();
  }

  async loadBreakPoints() {
    if (this.devisEnCours?.location?.id) {
      try {
        this.breakPoints = await this.activityService.findBreakPointsByLocation(
          this.devisEnCours.location.id
        );
        console.log(this.breakPoints);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('undefined destination');
    }
  }

  setDevisEnCours(data?: PlanningClient) {
    this.devisEnCours = data;
  }

  onRetour() {
    delete this.devisEnCours?.location;
    this.handleChange.emit(this.devisEnCours);
  }

  async onSelectBreakPoint(breakPoint: Activity) {
    if (breakPoint.point_x && breakPoint.point_y) {
      const startPoint = this.mapService.getStartPoint();
      const endPoint: LatLngExpression = [
        breakPoint.point_x,
        breakPoint.point_y,
      ];

      // get the route
      try {
        const route: RouteFetch = await this.mapService.getRoute(
          startPoint,
          endPoint
        );
        console.log(route);

        if (route.route) {
          if (route.route.routes && route.route.routes[0]) {
            if (route.route.routes[0].geometry) {
              const geometryStr = route.route.routes[0].geometry;
              const geometry: number[][] = decodePolyline(geometryStr);
              this.routeLines = geometry;
            } else {
              throw 'undefined geometry';
            }
          } else {
            throw 'empty routes in routeFetch.route';
          }
        } else {
          throw 'Undefined route from routeFetch';
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
