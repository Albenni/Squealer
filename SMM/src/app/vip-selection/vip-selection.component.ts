import { Component,  OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-vip-selection',
  templateUrl: './vip-selection.component.html',
  styleUrls: ['./vip-selection.component.css']
})
export class VipSelectionComponent {
  
  selectedAccount:string = "";
  accountList: string[] = [];
  smmUsername: string = this.sharedService.smmUsername;
  smmId: string = this.sharedService.smmId;
  /*
    per accedere a smm username
    this.sharedService.smmUsername
  */

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  ngOnInit(): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true 
    };

    // Effettua una richiesta GET all'API per ottenere la lista degli account
    this.http.get<string[]>('http://localhost:3500/:'+ this.smmId +'/vips?onlyAccepted=true', httpOptions).subscribe(data => {
      this.accountList = data;
    });
  }
}





