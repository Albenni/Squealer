import { Component, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SquealsResponse, SquealsInfo, GetReactionResponse } from '../../shared-interfaces';
@Component({
  selector: 'app-trend-tab',
  templateUrl: './trend-tab.component.html',
  styleUrls: ['./trend-tab.component.css'],
})
export class TrendTabComponent {
  getSqueals: SquealsResponse[] = [];
  squeals: SquealsInfo[] = [];
  mostPopularSqueal: SquealsInfo = {} as SquealsInfo;
  mostUnpopularSqueal: SquealsInfo = {} as SquealsInfo;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.uploadSqueals();
  }

  ngOnChanges(  changes: SimpleChanges) {
    this.uploadSqueals();
  }
  private uploadSqueals() {
    this.http
      .get<SquealsResponse[]>(
        'http://localhost:3500/api/users/' +
          sessionStorage.getItem('vipId') +
          '/squeals/smm'
      )
      .pipe(
        catchError((error: any) => {
          console.error('Si è verificato un errore:', error);
          return throwError('Errore gestito');
        })
      )
      .subscribe((data) => {
        if (data) {
          this.getSqueals = data;
          this.squeals = this.getSqueals.map((squeal) => {
            return {
              _id: squeal._id,
              author: squeal.author,
              publicSqueal: squeal.publicSqueal,
              receivers: squeal.receivers,
              officialChannel: squeal.officialChannel,
              content: squeal.content,
              contentType: squeal.contentType,
              impression: squeal.impression,
              createdAt: squeal.createdAt,
              convertedDate: '',
              neg0Reac: 0,
              neg1Reac: 0,
              pos2Reac: 0,
              pos3Reac: 0,
              weightedPosReac: 0,
              weightedNegReac: 0,
              __v: squeal.__v,
              category: squeal.category,
              tempGeolocation: squeal.tempGeolocation,
            };
          });
          const reactionPromises = this.squeals.map((squeal) => {
            this.convertDate(squeal);
            return this.getReactions(squeal);
          });
  
          Promise.all(reactionPromises).then(() => {
            this.getSquealsInfo();
            console.log(this.squeals);
          });
        } else {
          this.getSqueals = [];
          this.squeals = [];
        }
      });
  }

  getSquealsInfo() {
    console.log('Squeals before processing:', this.squeals);

    this.mostPopularSqueal = this.squeals.reduce((prev, current) => {
      console.log('Comparing for most popular:', prev.weightedPosReac, current.weightedPosReac);
      return prev.weightedPosReac > current.weightedPosReac ? prev : current;
    });

    this.mostUnpopularSqueal = this.squeals.reduce((prev, current) => {
    
      return prev.weightedNegReac > current.weightedNegReac ? prev : current;
    });

    console.log('most popular' , this.mostPopularSqueal);
    console.log('most unpopular', this.mostUnpopularSqueal);


  }

  getReactions(squeal: SquealsInfo): Promise<SquealsInfo> {
    return this.http
      .get<GetReactionResponse>('http://localhost:3500/api/squeals/' + squeal._id + '/reactions')
      .pipe(
        catchError((error: any) => {
          console.error('Si è verificato un errore:', error);
          return throwError('Errore gestito');
        })
      )
      .toPromise()
      .then((data) => {

        if (data) {
        squeal.neg0Reac = data.neg0Reac;
        squeal.neg1Reac = data.neg1Reac;
        squeal.pos2Reac = data.pos2Reac;
        squeal.pos3Reac = data.pos3Reac;
        squeal.weightedPosReac = data.pos2Reac + data.pos3Reac * 2;
        squeal.weightedNegReac = data.neg0Reac * 2 + data.neg1Reac;
      } else {
            console.error('No data returned for reactions');
      }
      return squeal;
      });
  }
  
  convertDate(squeal: SquealsInfo) {
    const inputDate = new Date(squeal.createdAt);
    const daysOfWeek = [
      'Domenica',
      'Lunedì',
      'Martedì',
      'Mercoledì',
      'Giovedì',
      'Venerdì',
      'Sabato',
    ];
    const months = [
      'Gennaio',
      'Febbraio',
      'Marzo',
      'Aprile',
      'Maggio',
      'Giugno',
      'Luglio',
      'Agosto',
      'Settembre',
      'Ottobre',
      'Novembre',
      'Dicembre',
    ];

    const dayOfWeek = daysOfWeek[inputDate.getUTCDay()];
    const day = inputDate.getUTCDate();
    const month = months[inputDate.getUTCMonth()];
    const year = inputDate.getUTCFullYear();

    squeal.convertedDate = `${dayOfWeek}, ${day} ${month} ${year}`;
  }
  getColor(category: string): string {
    switch (category) {
      case 'popolare':
        return 'green';
      case 'impopolare':
        return 'red';
      case 'controverso':
        return 'sandybrown';
      default:
        return 'black'; // default color
    }
  }
}
