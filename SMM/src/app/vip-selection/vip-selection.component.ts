import { Component,  OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { SharedService } from '../shared.service';
import  {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-vip-selection',
  templateUrl: './vip-selection.component.html',
  styleUrls: ['./vip-selection.component.css']
})
export class VipSelectionComponent {
  
  selectedAccount:string = "";
  vipList: string[] = [];
  usernamesId: string[] = [];
  smmUsername: string = this.sharedService.smmUsername;
  smmId: string = this.sharedService.smmId;
  token: string = this.sharedService.accessToken;

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
    this.http.get<string[]>('http://localhost:3500/users/'+ this.smmId +'/vips?onlyAccepted=true').pipe(
      catchError((error: any) => {
        // Gestisci l'errore qui
        console.error('Si è verificato un errore:', error);
        return throwError('Errore gestito');
      })
    )
    .subscribe(data => {
      const dataJson = JSON.stringify(data);
  
      this.vipList = dataJson.split(',');
      console.log('Data:' + this.vipList);
      
      const vipIdList = this.dataJson.map(item => item._id);
    });

    

    this.vipList.forEach((id) => {
      
    });
  }

  getUserName(id: number): void {
    this.http.get('http://localhost:3500/users/'+id).subscribe((data: any) => {
      this.usernamesId[id] = data.username;
    });
  
  }

}





