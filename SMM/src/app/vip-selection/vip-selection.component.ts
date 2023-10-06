import { Component,  OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-vip-selection',
  templateUrl: './vip-selection.component.html',
  styleUrls: ['./vip-selection.component.css']
})
export class VipSelectionComponent {
  
  selectedAccount:string = "";
  accountList: string[] = [];

  /*
    per accedere a smm username
    this.sharedService.smmUsername
  */
 
  constructor(private http: HttpClient, private sharedService: SharedService) { }

  ngOnInit(): void {
    // Effettua una richiesta GET all'API per ottenere la lista degli account
    this.http.get<string[]>('URL_DEL_TUO_API').subscribe(data => {
      this.accountList = data;
    });
  }
}





