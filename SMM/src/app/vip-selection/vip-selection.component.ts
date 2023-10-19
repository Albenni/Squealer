import { Component,  OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { SharedService } from '../shared.service';
import { DefaultOptionsInterceptor } from '../default-options.interceptor';
@Component({
  selector: 'app-vip-selection',
  templateUrl: './vip-selection.component.html',
  styleUrls: ['./vip-selection.component.css']
})
export class VipSelectionComponent {
  
  selectedAccount:string = "";
  vipIdList: string[] = [];
  smmUsername: string = this.sharedService.smmUsername;
  smmId: string = this.sharedService.smmId;
  token: string = this.sharedService.accessToken;
  accountList: string[] = [];
  /*
    per accedere a smm username
    this.sharedService.smmUsername
  */

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  ngOnInit(): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer aaa`
      }),
      withCredentials: true 
    };

    // Effettua una richiesta GET all'API per ottenere la lista degli account
    this.http.get<string[]>('http://localhost:3500/users/'+ this.smmId +'/vips?onlyAccepted=true').subscribe(data => {
      console.log(data);
      this.vipIdList = data;
      
    })
  }
}





