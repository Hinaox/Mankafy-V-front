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
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { LocationService } from '../../services/location.service';
import Location from '../../models/Location';
import { ColorService } from '../../services/color.service';
import Activity from '../../models/Activity';
import { ActivityService } from '../../services/activity.service';
import { MapService } from '../../services/map.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrl: './map.component.scss',
    standalone: false
})
export class MapComponent implements AfterViewInit, OnChanges, OnInit {
  private map: any;

  private readonly defaultZoom = 6.4;

  // marqueur temporaire
  tempMarker?: L.Marker;
  @Input() tempMarkerLatLng?: L.LatLng;

  // polygone temporaire
  @Input() tempPolygonCoords?: L.LatLngExpression[];
  tempPolygon?: L.Polygon;

  madagascarBounds: any = [
    [-26.0, 42.0], // Sud-Ouest (coordonnées approx.)
    [-11.0, 51.0], // Nord-Est (coordonnées approx.)
  ];

  // les données location
  parentLocations?: Location[];
  displayParentLocations = true;
  parentPolygons?: { polygon: L.Polygon; locationIndex?: number }[];

  // les données activités
  activities?: Activity[];
  activityMarkers?: { marker: L.Marker; activity: Activity }[];

  // message
  messageDisplay = false;
  message = '';

  // display options options
  @Input() showDestinationsOption = true;

  @Output() handleClick = new EventEmitter<L.LatLng>();
  @Output() handleLocationClick = new EventEmitter<Location>();

  @Input() autoZoomInParentLocations = true;

  constructor(
    private locationService: LocationService,
    private colorService: ColorService,
    private activityService: ActivityService,
    private mapService: MapService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tempMarkerLatLng']) {
      this.tempMarker?.remove();
      this.tempMarkerLatLng = changes['tempMarkerLatLng'].currentValue;
      if (this.tempMarkerLatLng)
        this.tempMarker = L.marker(this.tempMarkerLatLng).addTo(this.map);
    }
    if (changes['tempPolygonCoords']) {
      this.setTempPolygonCoords(changes['tempPolygonCoords'].currentValue);
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
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

    // Ajouter l'événement de clic pour récupérer les coordonnées
    this.map.on('click', this.onMapClick.bind(this));
    this.map.on('zoom', () => {
      const zoomLevel = this.map.getZoom();
      if (zoomLevel == this.defaultZoom) {
        // this.drawParentLocations();
        this.removeActivityMarkers();
      }
    });
  }

  private onMapClick(event: L.LeafletMouseEvent): void {
    this.handleClick.emit(event.latlng);
    // // ajouter marqueur temporaire
    // if (this.tempMarker) {
    //   this.tempMarker.remove();
    // }
    // this.tempMarker = L.marker(event.latlng).addTo(this.map);
  }

  private setTempPolygonCoords(data?: L.LatLngExpression[]) {
    if (data) {
      this.tempPolygonCoords = data;
      this.tempPolygon?.setLatLngs(this.tempPolygonCoords);
      this.tempPolygon?.redraw();
    }
  }

  onToggleDisplayParentLocations(event: any) {
    const checked = event.target.checked;
    if (checked) {
      // this.drawParentLocations();
    } else if (!checked && this.parentPolygons) {
      for (let polygon of this.parentPolygons) {
        polygon.polygon?.remove();
      }
    }
  }

  ngAfterViewInit(): void {
    this.initMap();

    // ajouter marqueur temporaire s'il y en a
    this.tempMarker?.addTo(this.map);

    // initialisation de polygone temporaire
    const polygonCoords: L.LatLngExpression[] = [
      [48.8566, 2.3522], // Coordonnée 1
      [48.8584, 2.2945], // Coordonnée 2
      [48.853, 2.3499], // Coordonnée 3
      [48.8465, 2.3522], // Coordonnée 4
    ];

    this.tempPolygon = L.polygon(polygonCoords, {
      color: 'blue', // Couleur des bordures
      fillColor: 'lightblue', // Couleur de remplissage
      fillOpacity: 0.5, // Opacité du remplissage
    });

    this.tempPolygon.addTo(this.map);

    // locations
    this.loadParentLocations();
  }

  private async loadParentLocations() {
    try {
      this.parentLocations = await this.locationService.findParents();
      // this.drawParentLocations();
    } catch (error) {
      console.error(error);
    }
  }

  private removeLocationPoligons() {
    console.log('remove locations');

    if (this.parentPolygons) {
      for (let item of this.parentPolygons) {
        item.polygon.remove();
      }
    }
  }

  private drawParentLocations() {
    this.colorService.reset();
    this.removeLocationPoligons();
    this.parentPolygons = [];
    if (this.parentLocations) {
      for (var i = 0; i < this.parentLocations.length; i++) {
        const location = this.parentLocations[i];
        if (location.surface) {
          const surfaceStr = location.surface;
          try {
            // traitement de la surface
            const surfaceTab = JSON.parse('[' + surfaceStr + ']');
            if (surfaceTab?.length) {
              const coords: L.LatLngExpression[] = surfaceTab;
              const color = this.colorService.getNextColor();
              const polygonStyles = {
                color: color, // Couleur des bordures
                fillColor: color, // Couleur de remplissage
                fillOpacity: 0.5, // Opacité du remplissage
              };

              const polygon = L.polygon(coords, polygonStyles);
              polygon.addTo(this.map);
              const object = { polygon: polygon, locationIndex: i };
              this.parentPolygons.push(object);

              const index = i;

              // event listener
              // polygon.on('click', () => {
              //   this.onParentPolygonClick(object);
              // });
            }
          } catch (error) {}
        }
      }
    }
  }

  async onParentPolygonClick(objet: {
    polygon: L.Polygon;
    locationIndex: number;
  }) {
    if (this.parentLocations) {
      const location = this.parentLocations[objet.locationIndex];
      this.handleLocationClick.emit(location);

      // le zoom automatique
      if (this.autoZoomInParentLocations) {
        const bounds = objet.polygon.getBounds();
        this.map.fitBounds(bounds);

        // charger les activités
        if (location.id) {
          await this.loadActivities(location.id);
          this.showActivities();
        }

        // masquer les autres
        if (this.parentPolygons) {
          const color = 'red';
          for (let polygon of this.parentPolygons) {
            const poly = polygon.polygon;
            poly.remove();
          }
          // placer l'ancien polygone en tant que bordure de la zone
          this.parentPolygons = [];
          const nouveau = objet.polygon.setStyle({
            fillColor: 'rgba(0,0,0,0)',
          });
          nouveau.addTo(this.map);
          this.parentPolygons.push(objet);
        }
      }
    }
  }

  // activity functions
  async loadActivities(locationId: number) {
    this.message = 'Chargement des activités';
    this.messageDisplay = true;
    try {
      this.activities = await this.activityService.findAllByLocation(
        locationId
      );
    } catch (error) {
      console.error(error);
    }
    this.messageDisplay = false;
  }

  async showActivities() {
    if (this.activities) {
      this.activityMarkers = [];
      this.removeActivityMarkers();

      // creation d'un cluster
      const group = L.markerClusterGroup();

      for (let activity of this.activities) {
        if (activity.point_x && activity.point_y) {
          var icon = this.mapService.activityIcon;
          // set the icon
          switch (activity.activityType?.name) {
            case 'restaurant':
              icon = this.mapService.restaurantIcon;
              break;
            case 'breakPoint':
              icon = this.mapService.hotelIcon;
              break;
          }

          const coords = L.latLng(activity.point_x, activity.point_y);
          const marker = L.marker(coords, { icon: icon });
          this.activityMarkers.push({ marker: marker, activity: activity });

          // les infos du marqueur
          if (activity.name) {
            marker.bindTooltip(activity.name, {
              permanent: true,
              direction: 'right',
            });

            marker.bindPopup(`
              <div style="padding: 2px; border-radius: 2px; font-size: 0.8em" >
              <b style="font-size: 1.2em" >${activity.name}</b> <br/> <br/>
              <button style="font-size: 1em; width: 100%" class="btn btn-success" >Ajouter</button>
              </div>
              `);
          }

          // ajouter le marqueur à la map
          // marker.addTo(this.map);
          group.addLayer(marker);
        }
      }
      this.map.addLayer(group);
    }
  }

  removeActivityMarkers() {
    if (this.activityMarkers) {
      for (let marker of this.activityMarkers) {
        marker.marker.remove();
      }
    }
  }
  // end activity functions

  hideMessage() {
    this.messageDisplay = false;
  }
}
