import { Component, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostComponent } from '../post/post.component';
import { UserItemComponent } from '../user-item/user-item.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class DashboardComponent implements OnInit {

  /*
  In questo modo, stai dichiarando posts$ come un'Observable o undefined. 
  La tua componente Dashboard inizierà con posts$ in uno stato non definito, 
  ma verrà inizializzata correttamente quando la richiesta HTTP sarà completata e assegnata alla variabile.
  */

  users$: Observable<any[]> | undefined;
  posts$: Observable<any[]> | undefined;



  constructor(private http: HttpClient) {}

  ngOnInit() {

    this.users$ = this.http.get<any[]>('URL_DEL_TUO_API/users');

    // Effettua una richiesta GET (forse post) all'API per ottenere l'array di post dell'utente spefifico
    // manca ancora api
    this.posts$ = this.http.get<any[]>('URL_DEL_TUO_API/posts');
  }
}