import { Component, Output, EventEmitter, OnInit } from '@angular/core';
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

  vipUsernames: string[] = [];
  vipProfilePics: string[] = [];
  vipIds: string[] = [];
  vipNames: string[] = [];
  vipSurnames: string[] = [];

  /*  vipsUsernames: string[] = ['vip1', 'vip2', 'vip3', 'vip4'];
  vipsProfilePics: string[] = [
    'https://picsum.photos/200',
    'https://picsum.photos/200',
    'https://picsum.photos/200',
    'https://picsum.photos/200',
  ];
 */
  constructor(private sharedService: SharedService, private router: Router) {}

  ngOnInit(): void {
    this.vipUsernames = JSON.parse(sessionStorage.getItem('vipUsernames')!);
    this.vipProfilePics = JSON.parse(
      sessionStorage.getItem('vipProfilePics')!
    );
    this.vipIds = JSON.parse(sessionStorage.getItem('vipIds')!);
    this.vipNames = JSON.parse(sessionStorage.getItem('vipNames')!);
    this.vipSurnames = JSON.parse(sessionStorage.getItem('vipSurnames')!);
  }

  changeVip(index: number) {
    sessionStorage.setItem('vipId', this.vipIds[index]);
    sessionStorage.setItem('vipUsername', this.vipUsernames[index]);
    sessionStorage.setItem('vipProfilePic', this.vipProfilePics[index]);
    sessionStorage.setItem('vipName', this.vipNames[index]);
    sessionStorage.setItem('vipSurname', this.vipSurnames[index]);

    this.vipSelected.emit(index);
  }
  shopButton() {
    this.router.navigate(['/shop']);
  }
}
