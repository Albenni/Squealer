import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UserData } from '../shared-interfaces';

@Component({
  selector: 'app-vip-selection',
  templateUrl: './vip-selection.component.html',
  styleUrls: ['./vip-selection.component.css'],
})
export class VipSelectionComponent {
  selectedAccount: string = '';
  vipUsernames: string[] = [];
  vipProfilePics: string[] = [];
  vipIds: string[] = [];
  smmUsername: string = this.sharedService.smmUsername;
  smmId: string = this.sharedService.smmId;
  token: string = this.sharedService.accessToken;

  logosrc: string = './assets/SLogo.png';
  /*
    per accedere a smm username
    this.sharedService.smmUsername
  */

  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Effettua una richiesta GET all'API per ottenere la lista degli account
    this.http
      .get<string[]>(
        'http://localhost:3500/users/' + this.smmId + '/vips?onlyAccepted=true'
      )
      .pipe(
        catchError((error: any) => {
          // Gestisci l'errore qui
          console.error('Si è verificato un errore:', error);
          return throwError('Errore gestito');
        })
      )
      .subscribe((data) => {
        data.map((item) => console.log(item));
        this.vipIds = data.map((item: any) => item.vipId);

        this.vipIds.forEach((id) => {
          this.getUsername(id);
        });

        this.sharedService.vipIds = this.vipIds;
        this.sharedService.vipUsernames = this.vipUsernames;
        this.sharedService.vipsProfilePics = this.vipProfilePics;
      });
  }

  getUsername(id: string) {
    this.http
      .get<string>('http://localhost:3500/users/' + id)
      .pipe(
        catchError((error: any) => {
          // Gestisci l'errore qui
          console.error('Si è verificato un errore:', error);
          return throwError('Errore gestito');
        })
      )
      .subscribe((data) => {
        this.vipUsernames.push((data as any)['username']);
        this.vipProfilePics.push((data as any)['profilePic']);
      });
  }

  onSubmit() {
    if (this.selectedAccount == '') {
      alert('Devi selezionare un account');
      return;
    } else {
      this.sharedService.selectedVipUsername = this.selectedAccount;
      console.log(this.sharedService.selectedVipUsername);

      //devo riassociare l'id corrispondente a quello username

      this.http
        .get<UserData[]>(
          'http://localhost:3500/users/?username=' + this.selectedAccount
        )
        .pipe(
          catchError((error: any) => {
            // Gestisci l'errore qui
            console.error('Si è verificato un errore:', error);
            return throwError('Errore gestito');
          })
        )
        .subscribe((data) => {
          const vip = data[0];
          this.sharedService.selectedVipId = vip._id;
          this.router.navigate(['/home']);
        });
    }
  }
}
