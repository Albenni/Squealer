import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor() {}

  getCurrentPosition(): Observable<GeolocationCoordinates> {
    return new Observable((observer: Observer<GeolocationCoordinates>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            observer.next(position.coords);
            observer.complete();
          },
          (error: GeolocationPositionError) => {
            observer.error(error);
          }
        );
      } else {
        observer.error('Geolocation is not supported by this browser.');
      }
    });
  }


  /*
  per usarlo:
  export class YourComponent implements OnInit {

  constructor(private geolocationService: GeolocationService) { }

  ngOnInit(): void {
    this.geolocationService.getCurrentPosition().subscribe(
      (position: GeolocationCoordinates) => {
        console.log('Current position:', position);
        // Do something with the position data
      },
      (error: any) => {
        console.error('Error getting current position:', error);
      }
    );
  }
  */
}
