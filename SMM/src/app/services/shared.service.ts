import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  //settati inizialmente nella onSubmit del login.component.ts
  public smmUsername: string = '';
  public smmId: string = '';

  //settati inizialmente nella onSubmit del vip-select.component.ts
  //in seguito vengono cambiati nella selectVip del dashboard.component.ts
  public selectedVipId: string = '';
  public selectedVipUsername: string = '';
  public selectedVipProfilePic: string = '';
  public selectedVipName: string = '';
  public selectedVipSurname: string = '';

  //settati inizialmente nella onSubmit del vip-select.component.ts
  public vipIds: string[] = [];
  public vipUsernames: string[] = [];
  public vipProfilePics: string[] = [];
  public vipNames: string[] = [];
  public vipSurnames: string[] = [];

  public accessToken: string = '';

  public dailyChar: string = '';
  public weeklyChar: string = '';
  public monthlyChar: string = '';


  constructor() {}
}
