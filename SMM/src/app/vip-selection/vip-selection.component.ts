import { Component,  OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-vip-selection',
  templateUrl: './vip-selection.component.html',
  styleUrls: ['./vip-selection.component.css']
})
export class VipSelectionComponent {
  smmUsername: string = "";
  selectedAccount:string = "";
  accountList: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Effettua una richiesta GET all'API per ottenere la lista degli account
    this.http.get<string[]>('URL_DEL_TUO_API').subscribe(data => {
      this.accountList = data;
    });
  }
}





