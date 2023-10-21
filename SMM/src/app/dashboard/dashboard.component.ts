 import { Component, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostComponent } from '../post/post.component';
import { UserItemComponent } from '../user-item/user-item.component';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class DashboardComponent implements OnInit {


 
  
 vipProfilePic: string = 'https://www.w3schools.com/howto/img_avatar.png';
/*
 vipUsername: string = this.sharedService.selectedVipUsername;
  vipsUsernames: string[] = ['Aldo', 'Giovanni', 'Giacomo'];
  vipsProfilePics: string[] = ['https://www.w3schools.com/howto/img_avatar.png', 'https://www.w3schools.com/howto/img_avatar.png', 'https://www.w3schools.com/howto/img_avatar.png'];
 */
  vipUsername: string = this.sharedService.selectedVipUsername;
  vipsUsernames: string[] = this.sharedService.vipUsernames;
   
  vipsProfilePics: string[] = this.sharedService.vipsProfilePics;


  /*
  In questo modo, stai dichiarando posts$ come un'Observable o undefined. 
  La tua componente Dashboard inizierà con posts$ in uno stato non definito, 
  ma verrà inizializzata correttamente quando la richiesta HTTP sarà completata e assegnata alla variabile.
  
  users$: Observable<any[]> | undefined;
  */
  posts$: Observable<any[]> | undefined;

  


  constructor(private http: HttpClient, private  sharedService: SharedService, private router: Router) {}

  ngOnInit() {
    
  
    /*
    // mi serve ancora lo userid
    const url = 'http://localhost:3500/:userId/vips';
    this.users$ = this.http.get<any[]>(url);
    */
    // Effettua una richiesta GET (forse post) all'API per ottenere l'array di post dell'utente spefifico
    // manca ancora api

    //this.posts$ = this.http.get<any[]>('URL_DEL_TUO_API/posts');
  }

  selectVip(index: number) {

    this.vipUsername = this.vipsUsernames[index];
    this.sharedService.selectedVipUsername = this.vipUsername;

    this.vipProfilePic = this.vipsProfilePics[index];
    this.sharedService.selectedVipProfilePic = this.vipProfilePic;

    //qui devono cambiare anche tutti i post etc..

  }

}