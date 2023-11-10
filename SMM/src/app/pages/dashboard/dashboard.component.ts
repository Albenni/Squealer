import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserItemComponent } from '../../components/user-item/user-item.component';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { CharacterDisplayerComponent } from '../../components/character-displayer/character-displayer.component';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Characters, GetCharsResponse } from '../../shared-interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  logosrc: string = './assets/SLogo.png'; // Dichiarazione della proprietà logo
  activeTab: string = 'feed';

  characters: Characters = {
    daily: 0,
    weekly: 0,
    monthly: 0,
  };

  vipProfilePic: string = 'https://www.w3schools.com/howto/img_avatar.png';
  /*
 vipUsername: string = this.sharedService.selectedVipUsername;
  vipsUsernames: string[] = ['Aldo', 'Giovanni', 'Giacomo'];
  vipsProfilePics: string[] = ['https://www.w3schools.com/howto/img_avatar.png', 'https://www.w3schools.com/howto/img_avatar.png', 'https://www.w3schools.com/howto/img_avatar.png'];
 */
  vipUsername: string = this.sharedService.selectedVipUsername;

  vipId = this.sharedService.selectedVipId;

  vipsUsernames: string[] = this.sharedService.vipUsernames;
  vipsProfilePics: string[] = this.sharedService.vipsProfilePics;

  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit() {
    this.http
      .get<GetCharsResponse>(
        'http://localhost:3500/users/' + this.vipId + '/charAvailable'
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
    this.vipUsername = this.vipsUsernames[index];
    this.sharedService.selectedVipUsername = this.vipUsername;

    this.vipProfilePic = this.vipsProfilePics[index];
    this.sharedService.selectedVipProfilePic = this.vipProfilePic;

    //qui devono cambiare anche tutti i post etc..
  }

  showChars() {}
}
