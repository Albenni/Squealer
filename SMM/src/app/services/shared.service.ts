import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  //settati inizialmente nella onSubmit del login.component.ts
  public smmUsername: string = '';
  public smmId: string = '';

  //settati inizialmente nella onSubmit del vip-selection.component.ts
  //in seguito vengono cambiati nella selectVip del dashboard.component.ts
  public selectedVipId: string = '';
  public selectedVipUsername: string = '';
  //manca ancora da settare
  public selectedVipProfilePic: string = '';

  //settati durante inizializzazione del vip-selection.component.ts
  public vipIds: string[] = [];
  public vipUsernames: string[] = [];
  public vipsProfilePics: string[] = [];

  public accessToken: string = '';

  public dailyChar: string = '';
  public weeklyChar: string = '';
  public monthlyChar: string = '';

  constructor() {}
}
