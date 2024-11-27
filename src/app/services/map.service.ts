import { Injectable } from '@angular/core';

import * as L from 'leaflet';
import { RouteFetch } from '../models/Route';
import { AuthService } from './Auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  startPoint: L.LatLngExpression = [-18.90332092867509, 47.52113602393204];

  // les icones utiles
  public readonly restaurantIcon = L.icon({
    iconUrl: '/assets/icons/restaurant-marker.png', // Chemin vers votre image
    iconSize: [38, 38], // Taille de l'icône
    iconAnchor: [19, 38], // Point d'ancrage (au centre en bas)
    popupAnchor: [0, -38], // Position du popup par rapport à l'icône
  });
  public readonly hotelIcon = L.icon({
    iconUrl: '/assets/icons/hotel-marker.png', // Chemin vers votre image
    iconSize: [38, 38], // Taille de l'icône
    iconAnchor: [19, 38], // Point d'ancrage (au centre en bas)
    popupAnchor: [0, -38], // Position du popup par rapport à l'icône
  });
  public readonly activityIcon = L.icon({
    iconUrl: '/assets/icons/activity-marker.png', // Chemin vers votre image
    iconSize: [38, 38], // Taille de l'icône
    iconAnchor: [19, 38], // Point d'ancrage (au centre en bas)
    popupAnchor: [0, -38], // Position du popup par rapport à l'icône
  });
  public readonly epingleIcon = L.icon({
    iconUrl: '/assets/icons/epingle-marker.png', // Chemin vers votre image
    iconSize: [38, 38], // Taille de l'icône
    iconAnchor: [19, 38], // Point d'ancrage (au centre en bas)
    popupAnchor: [0, -38], // Position du popup par rapport à l'icône
  });

  constructor(private authService: AuthService, private http: HttpClient) {}

  getStartPoint(): L.LatLngExpression {
    return this.startPoint;
  }

  getRoute(
    start: L.LatLngExpression,
    end: L.LatLngExpression
  ): Promise<RouteFetch> {
    return new Promise<RouteFetch>((resolve, reject) => {
      var debut: number[] = JSON.parse(JSON.stringify(start));
      debut = debut.reverse();
      var fin: number[] = JSON.parse(JSON.stringify(end));
      fin = fin.reverse();
      if (true) {
        const coords = [debut, fin];
        const url = this.authService.baseUrl(
          '/map/route?coords=' + JSON.stringify(coords)
        );
        this.http.get(url).subscribe(
          (data: any) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        );
      }
    });
  }
}
