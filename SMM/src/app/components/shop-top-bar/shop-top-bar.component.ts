import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shop-top-bar',
  templateUrl: './shop-top-bar.component.html',
  styleUrls: ['./shop-top-bar.component.css']
})
export class ShopTopBarComponent {
  logosrc: string = './assets/SLogo.png'; 

  constructor(private router: Router) {}

  homeButton(){
    this.router.navigate(['/home']);
  }
}
