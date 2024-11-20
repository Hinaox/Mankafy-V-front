import { AfterViewInit, Component } from '@angular/core';

import * as L from 'leaflet';

@Component({
  selector: 'app-destination-map',
  templateUrl: './destination-map.component.html',
  styleUrl: './destination-map.component.scss',
})
export class DestinationMapComponent implements AfterViewInit {
  private map: any;
  private readonly defaultZoom = 6.4;

  madagascarBounds: any = [
    [-26.0, 42.0], // Sud-Ouest (coordonnées approx.)
    [-11.0, 51.0], // Nord-Est (coordonnées approx.)
  ];

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap() {
    this.map = L.map('destination-map', {
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
}
