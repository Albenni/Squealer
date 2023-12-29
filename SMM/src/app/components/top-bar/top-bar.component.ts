import { Component, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Router } from '@angular/router';
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
  @Output() vipSelected: EventEmitter<number> = new EventEmitter<number>();

  logosrc: string = './assets/SLogo.png';

  vipsUsernames: string[] = this.sharedService.vipUsernames;
  vipsProfilePics: string[] = this.sharedService.vipProfilePics;

  /*  vipsUsernames: string[] = ['vip1', 'vip2', 'vip3', 'vip4'];
  vipsProfilePics: string[] = [
    'https://picsum.photos/200',
    'https://picsum.photos/200',
    'https://picsum.photos/200',
    'https://picsum.photos/200',
  ];
 */
  constructor(private sharedService: SharedService, private router: Router) {}

  changeVip(index: number) {

    this.sharedService.selectedVipUsername = this.vipsUsernames[index];
    this.sharedService.selectedVipProfilePic = this.vipsProfilePics[index];
    this.sharedService.selectedVipId = this.sharedService.vipIds[index];
    this.sharedService.selectedVipName = this.sharedService.vipNames[index];
    this.sharedService.selectedVipSurname = this.sharedService.vipSurnames[index];

    sessionStorage.setItem('vipId', this.sharedService.selectedVipId);
    sessionStorage.setItem('vipUsername', this.sharedService.selectedVipUsername);
    sessionStorage.setItem('vipProfilePic', this.sharedService.selectedVipProfilePic);
    sessionStorage.setItem('vipName', this.sharedService.selectedVipName);
    sessionStorage.setItem('vipSurname', this.sharedService.selectedVipSurname);    

    this.vipSelected.emit(index);
  }
  shopButton() {
    this.router.navigate(['/shop']);
  }
}
