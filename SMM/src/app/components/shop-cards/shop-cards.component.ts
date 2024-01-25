import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetCharsResponse } from 'src/app/shared-interfaces';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { API_CONFIG } from 'src/app/api.config';
@Component({
  selector: 'app-shop-cards',
  templateUrl: './shop-cards.component.html',
  styleUrls: ['./shop-cards.component.css'],
})
export class ShopCardsComponent {
  constructor(private http: HttpClient) {}

  handleCardClick(value: number): void {
    const url = API_CONFIG.url + 'users/'+sessionStorage.getItem('vipId')+'/charAvailable';
    console.log(`Card clicked with value: ${value}`);
    this.http.post<GetCharsResponse>(url, {
    char: value,
    }).pipe(
      catchError((error: any) => {
        console.error('Si è verificato un errore:', error);
        return throwError('Errore gestito');
      })
    ).subscribe((data) => {
      window.location.reload();
    });
  }


}
