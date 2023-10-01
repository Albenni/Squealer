import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = ''; // Dichiarazione della proprietà username
  password: string = ''; // Dichiarazione della proprietà password

  logosrc: string = "./assets/SLogo.png"; // Dichiarazione della proprietà logo
  onSubmit() {
  }
}
