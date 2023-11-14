import { Component, EventEmitter, Output } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
  providers: [
    {
      provide: BsDropdownConfig,
      useValue: { isAnimated: true, autoClose: true },
    },
  ],
})
export class TopBarComponent {
  @Output() vipSelected = new EventEmitter<number>();

  logosrc: string = './assets/SLogo.png'; // Dichiarazione della proprietà logo

   vipsUsernames: string[] = this.sharedService.vipUsernames;
  vipsProfilePics: string[] = this.sharedService.vipsProfilePics;
 
 /*  vipsUsernames: string[] = ['vip1', 'vip2', 'vip3', 'vip4'];
  vipsProfilePics: string[] = [
    'https://picsum.photos/200',
    'https://picsum.photos/200',
    'https://picsum.photos/200',
    'https://picsum.photos/200',
  ];
 */
  constructor(private sharedService: SharedService) {}

  changeVip(index: number) {
    // Emit the selected index to notify the parent component
    this.vipSelected.emit(index);
  }
}
