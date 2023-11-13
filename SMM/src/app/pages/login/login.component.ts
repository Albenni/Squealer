import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoginResponse } from '../../shared-interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userData = {
    user: '',
    pwd: '',
  };

  logosrc: string = './assets/SLogo.png'; // Dichiarazione della proprietà logo
  wrongResponse: boolean = false;
  tryId: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private sharedService: SharedService
  ) {}

  onSubmit() {
    const url = 'http://localhost:3500/api/auth/smm';

    this.http
      .post<LoginResponse>(url, this.userData)
      .pipe(
        catchError((error: any) => {
          // Gestisci l'errore qui
          /*
        verifica se l'acc è pro o no da errore API
        e crea messaggio conseguente se non lo è
        */

          this.wrongResponse = true;
          console.error('Si è verificato un errore:', error);
          return throwError('Errore gestito');
        })
      )
      .subscribe((data) => {
        this.sharedService.smmUsername = this.userData.user;
        this.sharedService.accessToken = data.accessToken;
        this.sharedService.smmId = data.userid;
        this.router.navigate(['/vipSelection']);
      });
  }
}
