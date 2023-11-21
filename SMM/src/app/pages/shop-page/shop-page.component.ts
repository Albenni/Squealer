import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Characters, GetCharsResponse } from '../../shared-interfaces';

import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css']
})
export class ShopPageComponent {

  characters: Characters = {
    daily: 0,
    weekly: 0,
    monthly: 0,
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http
      .get<GetCharsResponse>(
        'http://localhost:3500/api/users/' + sessionStorage.getItem('vipId') + '/charAvailable'
      )
      .pipe(
        catchError((error: any) => {
          console.error('Si è verificato un errore:', error);
          return throwError('Errore gestito');
        })
      )
      .subscribe((data) => {
        this.characters.daily = data.dailyChar;
        this.characters.weekly = data.weeklyChar;
        this.characters.monthly = data.monthlyChar;
      });
  }
}
