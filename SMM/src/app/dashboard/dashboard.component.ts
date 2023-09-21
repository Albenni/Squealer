import { Component } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class DashboardComponent {

}
