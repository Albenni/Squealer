import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public smmUsername: string = '';
  public smmId: string = '';

  public selectedVipId: string = '';
  public selectedVipUsername: string = '';
  public selectedVipProfilePic: string = '';
  public selectedVipName: string = '';
  public selectedVipSurname: string = '';

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
