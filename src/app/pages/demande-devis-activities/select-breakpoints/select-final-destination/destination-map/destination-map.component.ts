import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import * as L from 'leaflet';
import RouteDigraph from '../../../../../models/RouteDigraph';
import { MapService } from '../../../../../services/map.service';
import { RouteDigraphUtilsService } from '../../../../../utils/route-digraph-utils.service';
import { LocationService } from '../../../../../services/location.service';
import { RouteFetch } from '../../../../../models/Route';
import Location from '../../../../../models/Location';
import { decodePolyline } from '../../../../../utils/utils';
import { AuthService } from '../../../../../services/Auth/auth.service';
import PlanningClient from '../../../../../models/PlanningClient';

@Component({
  selector: 'app-destination-map',
  templateUrl: './destination-map.component.html',
  styleUrl: './destination-map.component.scss',
})
export class DestinationMapComponent implements AfterViewInit, OnChanges {
  private map?: L.Map;
  madagascarBounds: any = [
    [-26.0, 42.0], // Sud-Ouest (coordonnées approx.)
    [-11.0, 51.0], // Nord-Est (coordonnées approx.)
  ];
  private readonly defaultZoom = 6.4;

  // data
  @Input() routeDigraphs?: RouteDigraph[];
  @Input() planningClient?: PlanningClient;
  @Output() handleChoice = new EventEmitter<Location>();

  selectedRouteDigraph: RouteDigraph | null = null;

  locationMarkers: { marker: L.Marker; routeDigraph: RouteDigraph }[] = [];
  routePolyline?: L.Polyline;

  selectedLocation?: Location;

  constructor(
    private mapService: MapService,
    private routeDigraphUtils: RouteDigraphUtilsService,
    private locationService: LocationService,
    private authService: AuthService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['routeDigraphs']) {
      this.setRouteDigraphs(changes['routeDigraphs'].currentValue);
    }
    if (changes['planningClient']) {
      this.setPlanningClient(changes['planningClient'].currentValue);
    }
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  setPlanningClient(data?: PlanningClient) {
    this.planningClient = data;
  }

  setRouteDigraphs(data?: RouteDigraph[]) {
    this.routeDigraphs = data;
    if (this.routeDigraphs?.length) {
      this.drawLocationMarkers();
    }
  }

  initMap() {
    this.map = L.map('final-destination-map', {
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
    this.drawDefaultStartPoint();

    this.map.on('click', () => {
      this.resetLocationMarkerIcons();
    });
  }

  drawDefaultStartPoint() {
    try {
      if (!this.map) throw 'undefined component.map';
      const coods = this.mapService.getStartPoint();
      const marker = L.marker(coods, { icon: this.mapService.epingleIcon });
      marker.bindTooltip('Antananarivo', {
        permanent: true,
        direction: 'auto',
      });
      marker.addTo(this.map);
    } catch (error) {
      console.error(error);
    }
  }

  removeLocationMarkers() {
    for (let marker of this.locationMarkers) {
      marker.marker.remove();
    }
    this.locationMarkers = [];
  }
  drawLocationMarkers() {
    this.removeLocationMarkers();
    if (this.routeDigraphs) {
      for (let routeDigraph of this.routeDigraphs) {
        this.drawOneLocationMarker(routeDigraph);
      }
    } else {
      console.error('Undefined routeDigraphs');
    }
  }
  drawOneLocationMarker(routeDigraph: RouteDigraph) {
    try {
      if (!routeDigraph.location)
        throw `undefined routeDigraph.Location(${routeDigraph.id})`;
      if (!routeDigraph.location.point_x || !routeDigraph.location.point_y)
        throw `undefined routeDigraph.location.point_x/point_y (${routeDigraph.id})`;
      if (!this.map) throw 'undefined map';

      const coord: L.LatLngExpression = [
        routeDigraph.location.point_x,
        routeDigraph.location.point_y,
      ];
      const marker = L.marker(coord, {
        icon: this.mapService.activityIcon,
      });
      marker.bindTooltip(
        routeDigraph.location.name ? routeDigraph.location.name : '',
        { permanent: true, direction: 'auto' }
      );

      marker.addTo(this.map);

      // draw the children
      if (routeDigraph.children) {
        for (let child of routeDigraph.children) {
          this.drawOneLocationMarker(child);
        }
      }
      const objectToPush = { marker, routeDigraph };
      this.locationMarkers.push(objectToPush);

      marker.on('click', () => {
        this.onClickMarker(objectToPush);
      });
    } catch (error) {
      console.error(error);
    }
  }

  resetLocationMarkerIcons() {
    if (this.locationMarkers) {
      for (let marker of this.locationMarkers) {
        marker.marker.setIcon(this.mapService.activityIcon);
        if (marker.routeDigraph.location?.name) {
          marker.marker.bindTooltip(marker.routeDigraph.location.name, {
            permanent: true,
            direction: 'auto',
          });
        }
      }
    }
    this.routePolyline?.remove();
    this.selectedLocation = undefined;
  }
  onClickMarker(object: { marker: L.Marker; routeDigraph: RouteDigraph }) {
    if (!this.routeDigraphs) throw 'Undefined component.routeGraphs';
    this.selectedRouteDigraph = this.routeDigraphUtils.findParentTreeInArray(
      object.routeDigraph,
      this.routeDigraphs
    );
    if (!this.selectedRouteDigraph) throw 'route introuvable';
    // mettre en surbrillance les routes en question
    this.resetLocationMarkerIcons();
    this.brightRoute(this.selectedRouteDigraph);
    // dessiner la route
    const location = object.routeDigraph.location;
    this.selectedLocation = location;
    if (!location) throw 'undefined object.routeDigraph.location';
    this.drawRoutePolyline(location);
  }

  brightRoute(routeDigraph: RouteDigraph) {
    if (this.locationMarkers) {
      const marker = this.locationMarkers.find(
        (el) => el.routeDigraph.id == routeDigraph.id
      );
      if (marker) {
        marker.marker.setIcon(this.mapService.selectedMarkerIcon);
      } else {
        console.error('marker not found');
      }
      if (routeDigraph.children) {
        for (let child of routeDigraph.children) {
          this.brightRoute(child);
        }
      }

      // réduire les autres
      const unSelectedMarkers = this.locationMarkers.filter(
        (el) => el.marker.getIcon() != this.mapService.selectedMarkerIcon
      );
      for (let marker of unSelectedMarkers) {
        marker.marker.setIcon(this.mapService.unSelectedMarkerIcon);
        marker.marker.unbindTooltip();
      }
    }
  }
  async drawRoutePolyline(location: Location) {
    try {
      this.routePolyline?.remove();
      if (!location.id) throw 'undefined location.id';
      const route: RouteFetch =
        await this.locationService.getRouteBetweenLocations(location.id);
      if (!route.route?.routes?.length) throw 'empty routeFetch.route.routes';
      if (!route.route.routes[0].geometry)
        throw 'undefined routeFetch.route.routes[0].geometry';
      if (!this.map) throw 'undefined component.map';

      const geometryStr = route.route.routes[0].geometry;
      const geometry: L.LatLngExpression[] = decodePolyline(geometryStr);
      this.routePolyline = L.polyline(geometry);
      this.routePolyline.addTo(this.map);

      console.log(geometry);
    } catch (error) {
      console.error(error);
    }
  }

  onDestinationChoice() {
    try {
      console.log('planningClient', this.planningClient);
      console.log('selected route digraph', this.selectedRouteDigraph);
      if (!this.selectedLocation) throw 'undefined component.location';
      if (!this.selectedRouteDigraph)
        throw 'undefined component.selectedRouteDigraph';
      this.handleChoice.emit(this.selectedLocation);
    } catch (error) {
      console.error(error);
    }
  }
}
