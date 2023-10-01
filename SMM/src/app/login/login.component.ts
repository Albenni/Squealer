import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = ''; // Dichiarazione della proprietà username
  password: string = ''; // Dichiarazione della proprietà password

  logosrc: string = "./assets/SLogo.png"; // Dichiarazione della proprietà logo

  changeUsername(event: any) {
    this.username = event.target.value;
  } // Funzione che cambia il valore della proprietà username

  changePassword(event: any) {  
    this.password = event.target.value;
  }

  onSubmit() {
    console.log('Username: ' + this.username + ' Password: ' + this.password);
    fetch('http://localhost:3500/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        
      },
      credentials: 'include',
      body: JSON.stringify({
        user: this.username,
        pwd: this.password
      })
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  }



}
