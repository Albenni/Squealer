import { Component } from '@angular/core';

@Component({

  selector: 'login-component',
  template: `<h2>Componente: {{ nomeComponente }}</h2>`,
  styles: [
    `h2 {
      color: midnightblue;
      font-family: 'Courier New', Courier, monospace;
    }`,
    `h2:hover {
      color: crimson;
    }`
  ]
})


export class LoginComponent {

}
