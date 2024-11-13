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

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit, OnChanges {
  private map: any;

  // marqueur temporaire
  tempMarker?: L.Marker;
  @Input() tempMarkerLatLng?: L.LatLng;

  madagascarBounds: any = [
    [-26.0, 42.0], // Sud-Ouest (coordonnées approx.)
    [-11.0, 51.0], // Nord-Est (coordonnées approx.)
  ];

  @Output() handleClick = new EventEmitter<L.LatLng>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tempMarkerLatLng'].currentValue) {
      this.tempMarker?.remove();
      this.tempMarkerLatLng = changes['tempMarkerLatLng'].currentValue;
      if (this.tempMarkerLatLng)
        this.tempMarker = L.marker(this.tempMarkerLatLng).addTo(this.map);
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [-18.8792, 47.5079], // Centre de Madagascar (Antananarivo)
      zoom: 6.4,
      maxBounds: this.madagascarBounds,
      maxBoundsViscosity: 1.0,
      minZoom: 6.4,
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
  }

  private onMapClick(event: L.LeafletMouseEvent): void {
    this.handleClick.emit(event.latlng);
    // ajouter marqueur temporaire
    if (this.tempMarker) {
      this.tempMarker.remove();
    }
    this.tempMarker = L.marker(event.latlng).addTo(this.map);
  }

  ngAfterViewInit(): void {
    this.initMap();

    // ajouter marqueur temporaire s'il y en a
    this.tempMarker?.addTo(this.map);
  }
}
