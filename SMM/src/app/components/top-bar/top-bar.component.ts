import {
  Component,
  Output,
  EventEmitter,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GetVipsResponse, GetInfosVip } from '../../shared-interfaces';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { API_CONFIG } from 'src/app/api.config';
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
  @ViewChild('notificationsModal') notificationsModal!: TemplateRef<any>;
  modalRef?: BsModalRef;

  existNotifications: boolean = false;

  logosrc: string = './assets/SLogo.png';

  vipUsernames: string[] = [];
  vipProfilePics: string[] = [];
  vipIds: string[] = [];
  vipNames: string[] = [];
  vipSurnames: string[] = [];

  reqVipIds: string[] = [];
  reqVipUsernames: string[] = [];
  reqVipProfilePics: string[] = [];

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private modalService: BsModalService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.vipUsernames = JSON.parse(sessionStorage.getItem('vipUsernames')!);
    this.vipProfilePics = JSON.parse(sessionStorage.getItem('vipProfilePics')!);
    this.vipIds = JSON.parse(sessionStorage.getItem('vipIds')!);
    this.vipNames = JSON.parse(sessionStorage.getItem('vipNames')!);
    this.vipSurnames = JSON.parse(sessionStorage.getItem('vipSurnames')!);

    this.fetchNotification();
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

  openNotificationsModal() {
    this.modalRef = this.modalService.show(this.notificationsModal);
  }

  logout() {
    this.http
      .get(API_CONFIG.url + 'logout')
      .pipe(
        catchError((error: any) => {
          console.error('Si è verificato un errore:', error);
          return throwError('Errore gestito');
        })
      )
      .subscribe((data) => {
        sessionStorage.clear();
        this.router.navigate(['/login']);
      });
  }

  fetchNotification() {
    this.http
      .get<GetVipsResponse[]>(
        API_CONFIG.url +
          'users/' +
          sessionStorage.getItem('smmId') +
          '/vips?onlyAccepted=false'
      )
      .pipe(
        catchError((error: any) => {
          console.error('Si è verificato un errore:', error);
          return throwError('Errore gestito');
        })
      )
      .subscribe((data) => {
        if (data) {
          this.reqVipIds = data.map((item) => item.vipId);

          this.reqVipIds.forEach((vip) => {
            this.fetchInfos(vip);
          });
        } else {
          this.existNotifications = false;
        }
      });
  }

  fetchInfos(id: string) {
    this.http
      .get<GetInfosVip>(API_CONFIG.url + 'users/' + id)
      .pipe(
        catchError((error: any) => {
          console.error('Si è verificato un errore:', error);
          return throwError('Errore gestito');
        })
      )
      .subscribe((data) => {
        this.reqVipUsernames.push(data.username);
        this.reqVipProfilePics.push(data.profilePic);
        this.existNotifications = true;
      });
  }

  acceptVip(index: number) {
    this.http
      .post(
        API_CONFIG.url + 'users/' +
          sessionStorage.getItem('smmId') +
          '/vips/' +
          this.reqVipIds[index],
        {}
      )
      .pipe(
        catchError((error: any) => {
          console.error('Si è verificato un errore:', error);
          return throwError('Errore gestito');
        })
      )
      .subscribe((data) => {
        this.modalRef?.hide();
        location.reload();
      });
  }

  refuseVip(index: number) {
    this.http
      .delete(
        API_CONFIG.url + 'users/' +
          sessionStorage.getItem('smmId') +
          '/vips/' +
          this.reqVipIds[index],
        {}
      )
      .pipe(
        catchError((error: any) => {
          console.error('Si è verificato un errore:', error);
          return throwError('Errore gestito');
        })
      )
      .subscribe((data) => {
        this.modalRef?.hide();
        location.reload();
      });
  }
}
