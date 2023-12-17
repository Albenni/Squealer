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
  private marker?: L.Marker;

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
      }).addTo(this.map);

      this.map.on('click', (e: L.LeafletMouseEvent) => this.onMapClick(e));
    }
  }

  private onMapClick(e: L.LeafletMouseEvent): void {
    this.updateMarker(e.latlng);
  }

  private updateMarker(latlng: L.LatLng): void {
    if (this.marker) {
      this.marker.setLatLng(latlng);
    } else {
      const markerOptions: L.MarkerOptions = {
        icon: L.icon({
          iconUrl: '../../assets/SLogo.png',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        }),
      };
      this.marker = L.marker(latlng, markerOptions).addTo(this.map);
    }
    this.map.setView(latlng, 13);
  }
  useCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latlng = new L.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        this.updateMarker(latlng);
      }, () => {
        // Handle geolocation error here
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}
