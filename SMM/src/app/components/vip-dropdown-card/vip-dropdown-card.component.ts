import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vip-dropdown-card',
  templateUrl: './vip-dropdown-card.component.html',
  styleUrls: ['./vip-dropdown-card.component.css']
})
export class VipDropdownCardComponent {
  @Input() username: string = '';
  @Input() profileImg: string = '';

  

  constructor() { 

    
  }

}
