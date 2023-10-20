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
  vipUsernames: string[] = [];
  vipIds: string[] = [];
  smmUsername: string = this.sharedService.smmUsername;
  smmId: string = this.sharedService.smmId;
  token: string = this.sharedService.accessToken;

  /*
    per accedere a smm username
    this.sharedService.smmUsername
  */

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  ngOnInit(): void {


    // Effettua una richiesta GET all'API per ottenere la lista degli account
    this.http.get<string[]>('http://localhost:3500/users/'+ this.smmId +'/vips?onlyAccepted=true').pipe(
      catchError((error: any) => {
        // Gestisci l'errore qui
        console.error('Si è verificato un errore:', error);
        return throwError('Errore gestito');
      })
    )
    .subscribe(data => {
      console.log(data);
      data.map((item)=> console.log(item))
      this.vipIds = data.map((item: any) => item.vipId);

      this.vipIds.forEach((id)=>{
        console.log(id);
        this.getUsername(id);
      })
    });

  
  }

  getUsername(id: string){
    this.http.get<string>('http://localhost:3500/users/'+id).pipe(
      catchError((error: any) => {
        // Gestisci l'errore qui
        console.error('Si è verificato un errore:', error);
        return throwError('Errore gestito');
      })
    ).subscribe(data => {
      console.log(data);
      console.log((data as any)["username"]);



      this.vipUsernames.push((data as any)["username"]);

    });



  }


}





