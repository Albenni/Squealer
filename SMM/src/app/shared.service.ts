import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public smmUsername: string = "";
  public smmId: string = "";

  public selectedVipId: string = "";
  public selectedVipUsername: string = "";

  public vipIds: string[] = [];
  public vipUsernames: string[] = [];
  public vipsProfilePics: string[] = [];

  public accessToken: string = "";
  constructor() { }
}
