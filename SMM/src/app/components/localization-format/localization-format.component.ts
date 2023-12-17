import { Component, Input, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
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
  

  ngOnInit(){
    const coordinatesArray = this.coordinates.split(',');
    this.latitudine = coordinatesArray[0];
    this.longitudine = coordinatesArray[1];
  }
  ngAfterViewInit() {
    // Inizializza la mappa dopo la visualizzazione dei componenti
    this.initMap();
  }
  ngOnDestroy() {
    if (this.map) {
      this.map.off();
      this.map.remove();
    }
  }
  private initMap() {
  
    // Crea una mappa Leaflet con le coordinate
    this.map = L.map(this.mapId).setView([parseFloat(this.latitudine), parseFloat(this.longitudine)], 13);

    // Aggiungi un layer di mappa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   
    }).addTo(this.map);

    const markerOptions: L.MarkerOptions = {
    icon: L.icon({
      iconUrl: './assets/SLogo.png', // Percorso all'immagine del marker personalizzato
      iconSize: [32, 32], // Dimensioni del marker
      iconAnchor: [16, 32], // Punto in cui il marker tocca la mappa
      popupAnchor: [0, -32], // Punto in cui il popup si apre rispetto al marker
     
    })
  };

    // Aggiungi un marker alla mappa
    L.marker([parseFloat(this.latitudine), parseFloat(this.longitudine)], markerOptions).addTo(this.map)
      .bindPopup(this.latitudine + ',' + this.longitudine).openPopup();
  }
  
  
}
