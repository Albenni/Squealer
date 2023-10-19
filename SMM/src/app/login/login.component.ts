import { Component } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

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

  constructor(private http: HttpClient, private router: Router, private sharedService: SharedService) { }
  
  onSubmit() {
    const url = 'http://localhost:3500/auth/smm';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true 
    };

  
    const loginRequest$: Observable<any> = this.http.post(url, this.userData, httpOptions);

    loginRequest$.pipe(
      switchMap((response) => {
        console.log('Login successful:', response);
        this.sharedService.smmUsername = this.userData.user;
        this.router.navigate(['/vipSelection']);
        return of(response);
        
      })
    ).subscribe(
      (data) => {
        this.sharedService.accessToken= data.accessToken;
        this.sharedService.smmId = data.userid;
        console.log('smm id: ', this.sharedService.smmId);
      },
      (error) => {
        console.error('Error:', error);

      }
    );

  }
}
