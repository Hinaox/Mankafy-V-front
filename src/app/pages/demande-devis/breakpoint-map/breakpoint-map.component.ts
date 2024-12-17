import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import Activity from '../../../models/Activity';
import * as L from 'leaflet';
import { Breakpoints } from '@angular/cdk/layout';
import { MapService } from '../../../services/map.service';
import { AuthService } from '../../../services/Auth/auth.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { RouteFetch } from '../../../models/Route';
import PlanningClient from '../../../models/PlanningClient';

@Component({
  selector: 'app-breakpoint-map',
  templateUrl: './breakpoint-map.component.html',
  styleUrl: './breakpoint-map.component.scss',
  animations: [
    trigger('sideMenuTrigger', [
      transition(':enter', [
        style({ opacity: 0, translate: '300px' }),
        animate('300ms', style({ opacity: 1, translate: '0px' })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0, translate: '300px' })),
      ]),
    ]),
  ],
})
export class BreakpointMapComponent implements OnChanges, AfterViewInit {
  map?: L.Map;
  private readonly defaultZoom = 6.4;
  madagascarBounds: any = [
    [-26.0, 42.0], // Sud-Ouest (coordonnées approx.)
    [-11.0, 51.0], // Nord-Est (coordonnées approx.)
  ];

  @Input() devisEnCours?: PlanningClient;
  @Input() route?: RouteFetch;
  @Input() routeLines?: number[][];
  routeLinePolyLine?: L.Polyline;
  @Input() breakPoints?: Activity[];
  breakPointMarkers?: { marker: L.Marker; breakPoint: Activity }[];
  @Output() handleSelectBreakPoint = new EventEmitter<Activity>();
  @Output() handleBreakPointChoice = new EventEmitter<Activity>();
  selectedBreakPoint?: Activity;

  constructor(
    private mapService: MapService,
    private authService: AuthService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['breakPoints']) {
      this.setBreakPoints(changes['breakPoints'].currentValue);
    }
    if (changes['routeLines']) {
      this.setRouteLines(changes['routeLines'].currentValue);
    }
    if (changes['route']) {
      this.setRoute(changes['route'].currentValue);
    }
    if (changes['devisEnCours']) {
      this.setDevisEnCours(changes['devisEnCours'].currentValue);
    }
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.drawBreakPoints();
  }

  initMap() {
    this.map = L.map('breakpoint-map', {
      center: [-18.8792, 47.5079], // Centre de Madagascar (Antananarivo)
      zoom: 6.4,
      maxBounds: this.madagascarBounds,
      maxBoundsViscosity: 1.0,
      minZoom: this.defaultZoom,
      maxZoom: 18,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);

    this.drawStartingPoint();
    this.map.on('click', () => {
      this.selectedBreakPoint = undefined;
    });
  }

  setBreakPoints(data?: Activity[]) {
    this.breakPoints = data;
    if (data && this.map) {
      this.drawBreakPoints();
    }
  }

  drawStartingPoint() {
    const startCoords = this.mapService.getStartPoint();

    const marker = L.marker(startCoords, {
      icon: this.mapService.epingleIcon,
    });
    marker.bindTooltip('Point de départ', {
      direction: 'right',
      permanent: true,
    });
    if (this.map) marker.addTo(this.map);
  }

  drawBreakPoints() {
    if (this.breakPoints) {
      this.removeBreakPoints();
      this.breakPointMarkers = [];

      for (let breakPoint of this.breakPoints) {
        if (breakPoint.point_x && breakPoint.point_y) {
          const coords: L.LatLngExpression = [
            breakPoint.point_x,
            breakPoint.point_y,
          ];
          const marker = L.marker(coords, {
            icon: this.mapService.hotelIcon,
          });
          if (this.map) {
            marker.addTo(this.map);

            // tooltip
            const toolTipName = breakPoint.name ? breakPoint.name : '';
            marker.bindTooltip(toolTipName, {
              permanent: true,
              direction: 'right',
            });
            // end tooltip

            // marker event listener
            marker.on('click', () => {
              this.handleSelectBreakPoint.emit(breakPoint);
              this.map?.setView(coords, 8.5);
              this.setSelectedBreakPoint(breakPoint);
            });
            // end marker event listener

            this.breakPointMarkers.push({ marker, breakPoint });
          }
        }
      }
    }
  }
  setSelectedBreakPoint(data?: Activity) {
    this.selectedBreakPoint = data;
    if (this.selectedBreakPoint) {
      const img = this.selectedBreakPoint.image
        ? this.selectedBreakPoint.image
        : 'default_breakpoint.jpg';
      const imgPath = this.authService.baseUrl('/assets/images/' + img);
      this.selectedBreakPoint.imagePath = imgPath;
    }
  }
  removeBreakPoints() {
    if (this.breakPointMarkers)
      for (let object of this.breakPointMarkers) {
        object.marker.remove();
      }
  }

  setRouteLines(data?: number[][]) {
    this.removeRouteLines();
    this.routeLines = data;
    if (this.routeLines) {
      this.drawRouteLines();
    }
  }
  drawRouteLines() {
    if (this.routeLines) {
      try {
        const coords: any = this.routeLines;
        const line: L.Polyline = L.polyline(coords);
        console.log('route length', this.routeLines.length, this.routeLines);

        if (this.map) line.addTo(this.map);
        else throw 'undefined map';
        this.routeLinePolyLine = line;
      } catch (err) {
        console.error(err);
      }
    }
  }
  removeRouteLines() {
    this.routeLinePolyLine?.remove();
  }

  setRoute(data?: RouteFetch) {
    this.route = data;
  }

  setDevisEnCours(data?: PlanningClient) {
    this.devisEnCours = data;
  }

  onBreakPointChoice(data: Activity) {
    this.handleBreakPointChoice.emit(data);
  }
}
