import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

interface LoginResponse {
  accessToken: string;
  userid: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userData = {
    user: '',
    pwd: ''
  };

  logosrc: string = "./assets/SLogo.png"; // Dichiarazione della proprietà logo
  wrongResponse: boolean = false;

  constructor(private http: HttpClient, private router: Router, private sharedService: SharedService) { }
  
  onSubmit() {
    const url = 'http://localhost:3500/auth/smm';

    this.http.post<LoginResponse>(url, this.userData).pipe(
      catchError((error: any) => {
        // Gestisci l'errore qui
        this.wrongResponse = true;
        console.error('Si è verificato un errore:', error);
        return throwError('Errore gestito');
      })
    )
    .subscribe(data => {
        console.log('Login successful:', data);

        this.sharedService.smmUsername = this.userData.user;
        this.sharedService.accessToken= data.accessToken;
        this.sharedService.smmId = data.userid;

        console.log(this.sharedService.accessToken);

        this.router.navigate(['/vipSelection']);
    });


  }
}
