import { Injectable } from '@angular/core';

import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MapService {
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

  constructor() {}
}
