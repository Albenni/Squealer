import { Component, Input, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import axios from 'axios'; // Import Axios

@Component({
  selector: 'app-localization-format',
  templateUrl: './localization-format.component.html',
  styleUrls: ['./localization-format.component.css'],
})
export class LocalizationFormatComponent implements OnDestroy {
  @Input() coordinates: string = '';
  latitudine: string = '';
  longitudine: string = '';
  map!: L.Map;

  private static counter = 1;
  public mapId: string;
  constructor() {
    // Assign a unique ID based on the counter
    this.mapId = 'map' + LocalizationFormatComponent.counter++;
  }

  ngOnInit() {
    const coordinatesArray = this.coordinates.split(',');
    this.latitudine = coordinatesArray[0];
    this.longitudine = coordinatesArray[1];
  }
  ngAfterViewInit() {
    // Initialize the map after the components are rendered
    this.initMap();
  }
  ngOnDestroy() {
    if (this.map) {
      this.map.off();
      this.map.remove();
    }
  }
  private initMap() {
    // Create a Leaflet map with the coordinates
    this.map = L.map(this.mapId).setView([parseFloat(this.latitudine), parseFloat(this.longitudine)], 13);

    // Add a map layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(this.map);

    const markerOptions: L.MarkerOptions = {
      icon: L.icon({
        iconUrl: './assets/SLogo.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      }),
    };

    // Add a marker to the map
    const marker = L.marker([parseFloat(this.latitudine), parseFloat(this.longitudine)], markerOptions)
      .addTo(this.map)
      .bindPopup('Loading...') // Initial popup content while loading address

    // Use Axios to fetch address from the Nominatim API
    axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${this.latitudine}&lon=${this.longitudine}`)
      .then((response) => {
        console.log('Response from Nominatim:', response);
        const address = response.data.display_name;
        marker.setPopupContent(address).openPopup(); // Update the popup with the address
        
      })
      .catch((error) => {
        console.error('Error fetching address:', error);
      });
  }
}
