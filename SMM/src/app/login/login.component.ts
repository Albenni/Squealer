import { Component } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

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

  changeUsername(event: any) {
    this.userData.user = event.target.value;
  } // Funzione che cambia il valore della proprietà username

  changePassword(event: any) {  
    this.userData.pwd = event.target.value;
  }
  constructor(private http: HttpClient) { }

  onSubmit() {
    const url = 'http://localhost:3500/auth';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true // Add this option for 'include'
    };

    // Create an observable for the POST request
    const loginRequest$: Observable<any> = this.http.post(url, this.userData, httpOptions);

    loginRequest$.pipe(
      switchMap((response) => {
        console.log('Login successful:', response);
        return of(response); // You can return any data you need
      })
    ).subscribe(
      (data) => {
        // This block will execute after the POST request has completed successfully
        // You can access the data returned from the switchMap here
      },
      (error) => {
        console.error('Error:', error);
        // Handle any errors here
      }
    );

  }
}
