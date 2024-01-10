import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Characters, GetCharsResponse } from '../../shared-interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  refreshFeed: boolean = false;

  logosrc: string = './assets/SLogo.png';
  activeTab: string = 'feed';

  characters: Characters = {
    daily: 0,
    weekly: 0,
    monthly: 0,
  };

  vipProfilePic: string = '';
  vipUsername: string = '';
  vipId: string = '';

  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit() {
    this.vipId = sessionStorage.getItem('vipId')!;
    this.vipUsername = sessionStorage.getItem('vipUsername')!;
    this.vipProfilePic = sessionStorage.getItem('vipProfilePic')!;

    this.getChars();
  }

  getChars() {
    this.http
      .get<GetCharsResponse>(
        'http://localhost:3500/api/users/' +
          sessionStorage.getItem('vipId') +
          '/charAvailable'
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

  selectVip(index: number) {
    this.vipUsername = sessionStorage.getItem('vipUsername')!;
    
    this.vipProfilePic = sessionStorage.getItem('vipProfilePic')!;
    this.refreshFeed = !this.refreshFeed;
    this.getChars();
  }
}
