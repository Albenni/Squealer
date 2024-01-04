import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vip-requests',
  templateUrl: './vip-requests.component.html',
  styleUrls: ['./vip-requests.component.css']
})
export class VipRequestsComponent {
  logosrc: string = './assets/SLogo.png';

  constructor(private router: Router) {}
}
