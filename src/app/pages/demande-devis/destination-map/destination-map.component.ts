import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

import * as L from 'leaflet';
import { LocationService } from '../../../services/location.service';
import Location from '../../../models/Location';
import { ColorService } from '../../../services/color.service';
import { AuthService } from '../../../services/Auth/auth.service';
import { MapService } from '../../../services/map.service';

@Component({
  selector: 'app-destination-map',
  templateUrl: './destination-map.component.html',
  styleUrl: './destination-map.component.scss',
  standalone: false,
})
export class DestinationMapComponent implements AfterViewInit, OnInit {
  private map?: L.Map;
  private readonly defaultZoom = 6.4;

  @Output() handleSelectDestination = new EventEmitter<Location>();

  madagascarBounds: any = [
    [-26.0, 42.0], // Sud-Ouest (coordonnées approx.)
    [-11.0, 51.0], // Nord-Est (coordonnées approx.)
  ];

  // locations
  destinations?: Location[];
  destinationPolygons?: { polygon: L.Polygon; destination: Location }[];

  constructor(
    private locationService: LocationService,
    private colorService: ColorService,
    private authService: AuthService,
    private mapService: MapService
  ) {}

  ngOnInit(): void {}

  async ngAfterViewInit(): Promise<void> {
    this.initMap();
    await this.loadDestinations();
    this.drawDestinations();
  }

  initMap() {
    try {
      this.map = L.map('carte', {
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

      const marker = L.marker([-25.16444799978048, 44.90324734547442], {
        icon: this.mapService.activityIcon,
      }).addTo(this.map);
    } catch (error) {
      console.error(error);
    }
  }

  // destination functions
  async loadDestinations() {
    try {
      this.destinations = await this.locationService.findParents();
      console.log('destinations', this.destinations);
    } catch (error) {
      console.error(error);
    }
  }

  drawDestinations() {
    if (this.destinations) {
      this.destinationPolygons = [];
      for (let destination of this.destinations) {
        if (destination.surface) {
          try {
            const surfaceStr = destination.surface;
            const surfaceTab = JSON.parse('[' + surfaceStr + ']');
            console.log(surfaceTab.length, surfaceTab);

            if (surfaceTab?.length) {
              const coords: L.LatLngExpression[] = surfaceTab;
              const color = this.colorService.getNextColor();
              const polygonStyles = {
                color: color, // Couleur des bordures
                fillColor: color, // Couleur de remplissage
                fillOpacity: 0.5, // Opacité du remplissage
              };

              const polygon = L.polygon(coords, polygonStyles);

              const imgName = destination.image
                ? destination.image
                : 'default_location.jpg';

              const imgPath = this.authService.baseUrl(
                '/assets/images/' + imgName
              );

              const content = document.createElement('div');
              content.style.width = '300px';
              content.style.fontSize = '0.9em';

              const imgElement = document.createElement('img');
              imgElement.src = imgPath;
              imgElement.style.width = '100%';
              content.appendChild(imgElement);

              const nameContainerElement = document.createElement('div');
              nameContainerElement.classList.add('text-center', 'mt-2');
              content.appendChild(nameContainerElement);

              const nameElement = document.createElement('b');
              nameElement.style.fontSize = '1.25em';
              nameElement.innerHTML = destination.name ? destination.name : '';
              nameContainerElement.appendChild(nameElement);

              const descriptionElement = document.createElement('p');
              descriptionElement.innerHTML = destination.description
                ? destination.description
                : '';
              content.appendChild(descriptionElement);

              const button = document.createElement('button');
              button.classList.add('btn', 'btn-success');
              button.style.width = '100%';
              button.innerHTML = 'Choisir';
              content.appendChild(button);

              button.addEventListener('click', () => {
                this.onSelectDestination(destination);
              });

              polygon.bindPopup(content);

              if (!this.map) throw 'undefined component.map';
              polygon.addTo(this.map);

              const object = { polygon: polygon, destination: destination };
              this.destinationPolygons.push(object);
            } else {
              throw 'impossible de lire surfaceTab.length';
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          console.error('undefined destination.surface', destination.id);
        }
      }
    }
  }
  // end destination functions

  onSelectDestination(destination: Location) {
    this.handleSelectDestination.emit(destination);
  }
}
