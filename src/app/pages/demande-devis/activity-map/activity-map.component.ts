import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as L from 'leaflet';
import Activity from '../../../models/Activity';
import { MapService } from '../../../services/map.service';

@Component({
    selector: 'app-activity-map',
    templateUrl: './activity-map.component.html',
    styleUrl: './activity-map.component.scss',
    standalone: false
})
export class ActivityMapComponent implements AfterViewInit, OnChanges {
  map?: L.Map;
  activityCluster?: L.MarkerClusterGroup;
  private readonly defaultZoom = 6.4;
  madagascarBounds: any = [
    [-26.0, 42.0], // Sud-Ouest (coordonnées approx.)
    [-11.0, 51.0], // Nord-Est (coordonnées approx.)
  ];

  @Input() activities?: {
    activity: Activity;
    distance: number;
    duration: number;
  }[];
  activityMarkers?: { marker: L.Marker; activity: Activity }[];

  constructor(private mapService: MapService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activities']) {
      this.setActivities(changes['activities'].currentValue);
    }
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap() {
    this.map = L.map('activity-map', {
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

    // creation d'un cluster
    this.activityCluster = L.markerClusterGroup();
    this.map.addLayer(this.activityCluster);
  }

  setActivities(
    data?: { activity: Activity; distance: number; duration: number }[]
  ) {
    this.activities = data;
    if (data) {
      this.drawActivities();
    }
  }
  drawActivities() {
    this.removeActivities();
    this.activityMarkers = [];
    if (this.activities) {
      for (let activity of this.activities) {
        const point_x = activity.activity.point_x;
        const point_y = activity.activity.point_y;
        if (point_x && point_y) {
          const coords: L.LatLngExpression = [point_x, point_y];
          const marker: L.Marker = L.marker(coords, {
            icon: this.mapService.activityIcon,
          });
          if (activity.activity.name) {
            marker.bindTooltip(activity.activity.name, {
              direction: 'auto',
              permanent: true,
            });
          }
          if (this.map) {
            // marker.addTo(this.map);
            this.activityCluster?.addLayer(marker);
            this.activityMarkers.push({ marker, activity });
          } else {
            console.error('undefined map');
          }
        }
      }
    }
  }
  removeActivities() {
    if (this.activityMarkers) {
      for (let marker of this.activityMarkers) {
        marker.marker.remove();
      }
    }
  }
}
