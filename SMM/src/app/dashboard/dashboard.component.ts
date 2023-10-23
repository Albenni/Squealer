 import { Component, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostComponent } from '../post/post.component';
import { UserItemComponent } from '../user-item/user-item.component';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { CharacterDisplayerComponent } from '../character-displayer/character-displayer.component';
import  {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

interface Characters {
  daily: number;
  weekly: number;
  monthly: number;
}
interface CharResponse {
  // quando filo fixa la getCharsavailable posso anche fondere questa
  //interfaccia e la characters
  charAvailable: number;
  _id: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class DashboardComponent implements OnInit {

  activeTab: string = 'feed';

  characters: Characters = {
    daily: 0,
    weekly: 0,
    monthly: 0
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



  posts$: Observable<any[]> | undefined;

  


  constructor(private http: HttpClient, private  sharedService: SharedService, private router: Router) {}

  ngOnInit() {
    console.log(this.vipId);

    this.http.get<CharResponse>('http://localhost:3500/users/'+ this.vipId +'/charAvailable').pipe(
      catchError((error: any) => {
        // Gestisci l'errore qui
        console.error('Si è verificato un errore:', error);
        return throwError('Errore gestito');
      })
    ).subscribe(data => {
      this.characters.daily = data.charAvailable;  
      this.characters.weekly = data.charAvailable;
      this.characters.monthly = data.charAvailable;
    });
  }

  selectVip(index: number) {

    this.vipUsername = this.vipsUsernames[index];
    this.sharedService.selectedVipUsername = this.vipUsername;

    this.vipProfilePic = this.vipsProfilePics[index];
    this.sharedService.selectedVipProfilePic = this.vipProfilePic;

    //qui devono cambiare anche tutti i post etc..

  }

  showChars(){

  }
}