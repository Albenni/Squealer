import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, forkJoin, of } from 'rxjs';
import {
  GetVipsResponse,
  GetInfosVip,
  UserData,
} from 'src/app/shared-interfaces';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-vip-select-page',
  templateUrl: './vip-select-page.component.html',
  styleUrls: ['./vip-select-page.component.css'],
})
export class VipSelectPageComponent {
  logosrc: string = './assets/SLogo.png';
  smmUsername: string = sessionStorage.getItem('smmUsername')!;
  smmId: string = sessionStorage.getItem('smmId')!;
  token: string = sessionStorage.getItem('accessToken')!;

  existVips: boolean = false;

  selectedAccountUsername: string = '';

  vipImages: string[] = [];
  vipUsernames: string[] = [];
  vipIds: string[] = [];
  vipNames: string[] = [];
  vipSurnames: string[] = [];

  reqVipIds: string[] = [];
  reqVipUsernames: string[] = [];
  reqVipProfilePics: string[] = [];
  constructor(
    private router: Router,
    private http: HttpClient,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {

    this.sharedService.vipUsernames = [];
    this.sharedService.vipIds = [];
    this.sharedService.vipProfilePics = [];
    this.sharedService.vipNames = [];
    this.sharedService.vipSurnames = [];

    this.http
      .get<GetVipsResponse[]>(
        'http://localhost:3500/api/users/' +
          this.smmId +
          '/vips?onlyAccepted=true'
      )
      .pipe(
        catchError((error: any) => {
          console.error('Si è verificato un errore:', error);
          return throwError('Errore gestito');
        })
      )
      .subscribe((data) => {
        if (data) {
          this.existVips = true;
          const observables = data.map((item) =>
            this.getInfosVipById(item.vipId)
          );
          forkJoin(observables).subscribe(() => {
            this.updateSessionStorage();
          });
        } else {
          this.existVips = false;
          this.getVipRequests();
        }
      });
  }

  getVipRequests() {
    this.http
      .get<GetVipsResponse[]>(
        'http://localhost:3500/api/users/' +
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
        this.reqVipIds = data.map((item) => item.vipId);

        this.reqVipIds.forEach((vip) => {
          this.fetchInfos(vip);
        });
      });
  }

  fetchInfos(id: string) {
    this.http
      .get<GetInfosVip>('http://localhost:3500/api/users/' + id)
      .pipe(
        catchError((error: any) => {
          console.error('Si è verificato un errore:', error);
          return throwError('Errore gestito');
        })
      )
      .subscribe((data) => {
        this.reqVipUsernames.push(data.username);
        this.reqVipProfilePics.push(data.profilePic);
      });
  }

  getInfosVipById(id: string) {
    return this.http
      .get<GetInfosVip>('http://localhost:3500/api/users/' + id)
      .pipe(
        catchError((error: any) => {
          console.error('Si è verificato un errore:', error);
          return throwError('Errore gestito');
        }),
        tap((data: GetInfosVip) => {
          this.vipUsernames.push(data.username);
          this.sharedService.vipUsernames.push(data.username);

          this.vipIds.push(id);
          this.sharedService.vipIds.push(id);

          if (data.profilePic != null) {
            const source =  'http://localhost:3500/profilePic/'+ id+'.' + data.profilePic.split('.')[1];
            this.vipImages.push(source);
            this.sharedService.vipProfilePics.push(source);
          } else {
            this.vipImages.push('./assets/default-profile-pic.webp');
            this.sharedService.vipProfilePics.push('./assets/default-profile-pic.webp');
          }
      

          this.vipNames.push(data.firstname);
          this.sharedService.vipNames.push(data.firstname);

          this.vipSurnames.push(data.surname);
          this.sharedService.vipSurnames.push(data.surname);
        })
      );
  }

  updateSessionStorage() {
    sessionStorage.setItem('vipIds', JSON.stringify(this.sharedService.vipIds));
    sessionStorage.setItem(
      'vipUsernames',
      JSON.stringify(this.sharedService.vipUsernames)
    );
    sessionStorage.setItem(
      'vipProfilePics',
      JSON.stringify(this.sharedService.vipProfilePics)
    );
    sessionStorage.setItem(
      'vipNames',
      JSON.stringify(this.sharedService.vipNames)
    );
    sessionStorage.setItem(
      'vipSurnames',
      JSON.stringify(this.sharedService.vipSurnames)
    );
  }

  onSubmit() {
    if (this.selectedAccountUsername == '') {
      alert('Devi selezionare un account');
      return;
    } else {
      sessionStorage.setItem('vipUsername', this.selectedAccountUsername);
      this.sharedService.selectedVipUsername = this.selectedAccountUsername;

      const index = this.vipUsernames.indexOf(this.selectedAccountUsername);

      const correspondingImage = this.vipImages[index];
      const correspondingId = this.vipIds[index];
      const correspondingName = this.vipNames[index];
      const correspondingSurname = this.vipSurnames[index];

      sessionStorage.setItem('vipProfilePic', correspondingImage);
      this.sharedService.selectedVipProfilePic = correspondingImage;

      sessionStorage.setItem('vipId', correspondingId);
      this.sharedService.selectedVipId = correspondingId;

      sessionStorage.setItem('vipName', correspondingName);
      this.sharedService.selectedVipName = correspondingName;

      sessionStorage.setItem('vipSurname', correspondingSurname);
      this.sharedService.selectedVipSurname = correspondingSurname;

      this.router.navigate(['/home']);
    }
  }

  acceptVip(index: number) {
    this.http
      .post(
        'http://localhost:3500/api/users/' +
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
        this.router.navigate(['/login']);
      });
  }
}
