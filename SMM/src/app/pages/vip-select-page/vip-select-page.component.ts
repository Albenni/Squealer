import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError,tap } from 'rxjs/operators';
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

  selectedAccountUsername: string = '';

  vipImages: string[] = [];
  vipUsernames: string[] = [];
  vipIds: string[] = [];
  vipNames: string[] = [];
  vipSurnames: string[] = [];

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
          // Gestisci l'errore qui
          console.error('Si è verificato un errore:', error);
          return throwError('Errore gestito');
        })
      )
      .subscribe((data) => {
        const observables = data.map((item) =>
          this.getInfosVipById(item.vipId)
        );
        forkJoin(observables).subscribe(() => {
          this.updateSessionStorage();
        });
      });
  }

  getInfosVipById(id: string) {
    return this.http.get<GetInfosVip>('http://localhost:3500/api/users/' + id).pipe(
      catchError((error: any) => {
        console.error('Si è verificato un errore:', error);
        return throwError('Errore gestito');
      }),
      tap((data:GetInfosVip ) => {
        this.vipUsernames.push(data.username);
        this.sharedService.vipUsernames.push(data.username);
        console.log('vipUsernames: ' + this.vipUsernames);
        this.vipIds.push(id);

        this.sharedService.vipIds.push(id);

        this.vipImages.push(data.profilePic);
        this.sharedService.vipProfilePics.push(data.profilePic);

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
}
