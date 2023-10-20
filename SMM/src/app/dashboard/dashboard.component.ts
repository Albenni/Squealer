 import { Component, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostComponent } from '../post/post.component';
import { UserItemComponent } from '../user-item/user-item.component';
import { SharedService } from '../shared.service';

import { jsonData } from 'src/assets/examples/postdatasample';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class DashboardComponent implements OnInit {


  vipsProfilePics: string[] = this.sharedService.vipsProfilePics;
  vipsUsernames: string[] = this.sharedService.vipUsernames;
  vipProfilePic: string = 'https://www.w3schools.com/howto/img_avatar.png';
  vipUsername: string = 'Aldo'
 // vipUsername: string = this.sharedService.selectedVipUsername;


  /*
  In questo modo, stai dichiarando posts$ come un'Observable o undefined. 
  La tua componente Dashboard inizierà con posts$ in uno stato non definito, 
  ma verrà inizializzata correttamente quando la richiesta HTTP sarà completata e assegnata alla variabile.
  
  users$: Observable<any[]> | undefined;
  */
  posts$: Observable<any[]> | undefined;

  


  constructor(private http: HttpClient, private  sharedService: SharedService) {}

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

}