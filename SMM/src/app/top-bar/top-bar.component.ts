import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class TopBarComponent {

  logosrc: string = "./assets/SLogo.png"; // Dichiarazione della proprietà logo

  vipsUsernames: string[] = this.sharedService.vipUsernames;
  vipsProfilePics: string[] = this.sharedService.vipsProfilePics;

  constructor(private  sharedService: SharedService) { }
  selectVip(index: number) {

    this.sharedService.selectedVipUsername = this.sharedService.vipUsernames[index];
    this.sharedService.selectedVipProfilePic = this.vipsProfilePics[index];

    //qui devono cambiare anche tutti i post etc..
  }
}
