import { Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-geolocalization-post',
  templateUrl: './geolocalization-post.component.html',
  styleUrls: ['./geolocalization-post.component.css'],
})
export class GeolocalizationPostComponent implements OnInit, OnDestroy {
  private map!: L.Map;
  private chosenLocation!: L.LatLng;

  ngOnInit() {
    this.initMap();
  }
  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
    if (!this.map) {
      this.map = L.map('map-posting').setView([51.505, -0.09], 13); // Default location
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors',
      }).addTo(this.map);

      this.map.on('click', (e: L.LeafletMouseEvent) => this.onMapClick(e));
    }
  }

  private onMapClick(e: L.LeafletMouseEvent): void {
    this.chosenLocation = e.latlng;
    // Add or update marker
    L.marker(this.chosenLocation).addTo(this.map);
  }
  useCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.chosenLocation = new L.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        // Update map view and marker
        // ...
      });
    } else {
      // Handle error or notify user that geolocation is not supported
    }
  }
}
