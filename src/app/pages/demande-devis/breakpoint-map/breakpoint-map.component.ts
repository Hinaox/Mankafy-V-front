import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import Activity from '../../../models/Activity';
import * as L from 'leaflet';
import { Breakpoints } from '@angular/cdk/layout';
import { MapService } from '../../../services/map.service';

@Component({
  selector: 'app-breakpoint-map',
  templateUrl: './breakpoint-map.component.html',
  styleUrl: './breakpoint-map.component.scss',
})
export class BreakpointMapComponent implements OnChanges, AfterViewInit {
  map?: any;
  private readonly defaultZoom = 6.4;
  madagascarBounds: any = [
    [-26.0, 42.0], // Sud-Ouest (coordonnées approx.)
    [-11.0, 51.0], // Nord-Est (coordonnées approx.)
  ];

  @Input() breakPoints?: Activity[];
  breakPointMarkers?: { marker: L.Marker; breakPoint: Activity }[];

  constructor(private mapService: MapService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['breakPoints']) {
      this.setBreakPoints(changes['breakPoints'].currentValue);
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
  }

  setBreakPoints(data?: Activity[]) {
    this.breakPoints = data;
    if (data && this.map) {
      this.drawBreakPoints();
    }
  }

  drawBreakPoints() {
    if (this.breakPoints) {
      this.removeBreakPoints();
      this.breakPointMarkers = [];

      for (let breakPoint of this.breakPoints) {
        if (breakPoint.point_x && breakPoint.point_y) {
          const marker = L.marker([breakPoint.point_x, breakPoint.point_y], {
            icon: this.mapService.hotelIcon,
          });
          marker.addTo(this.map);

          const content = document.createElement('div');
          content.innerHTML = 'hello';

          marker.bindPopup(content);

          this.breakPointMarkers.push({ marker, breakPoint });
        }
      }
    }
  }
  removeBreakPoints() {
    if (this.breakPointMarkers)
      for (let object of this.breakPointMarkers) {
        object.marker.remove();
      }
  }
}
