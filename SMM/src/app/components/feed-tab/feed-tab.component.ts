import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import {
  GetSquealsResponse,
  FilterParams,
  SquealsInfo,
  GetReactionResponse,
} from '../../shared-interfaces';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError, map } from 'rxjs';

@Component({
  selector: 'app-feed-tab',
  templateUrl: './feed-tab.component.html',
  styleUrls: ['./feed-tab.component.css'],
})
export class FeedTabComponent {
  getSqueals: GetSquealsResponse[] = [];
  squeals: SquealsInfo[] = [];
  displayedSqueals: SquealsInfo[] = [];

  /* squeals: SquealsInfo[] = [
    {
      _id: '6548e23a7faecfb150cfd657',
      author: '651d64ffba243e0813e502dd',
      publicSqueal: true,
      officialChannel: false,
      content: 'https://picsum.photos/200',
      contentType: 'image',
      impression: 45,
      createdAt: '2023-11-06T12:55:22.315Z',
      __v: 0,
      receivers: [],
      posReac: 0,
      negReac: 0,
      convertedDate: '10 Novembre 2023',
    },
    {
      _id: '6548e2497faecfb150cfd65b',
      author: '651d64ffba243e0813e502dd',
      publicSqueal: true,
      officialChannel: false,
      content: 'https://picsum.photos/200',
      contentType: 'image',
      impression: 45,
      createdAt: '2023-11-06T12:55:37.362Z',
      __v: 0,
      receivers: [],
      posReac: 0,
      negReac: 0,
      convertedDate: '10 Novembre 2023',
    },
    {
      _id: '6548e24a7faecfb150cfd65f',
      author: '651d64ffba243e0813e502dd',
      publicSqueal: true,
      officialChannel: false,
      content: 'https://picsum.photos/200',
      contentType: 'image',
      impression: 45,
      createdAt: '2023-11-06T12:55:38.067Z',
      __v: 0,
      receivers: [],
      posReac: 0,
      negReac: 0,
      convertedDate: '10 Novembre 2023',
    },
    {
      _id: '654b9cec15e2330c700374c6',
      author: '651d64ffba243e0813e502dd',
      publicSqueal: true,
      officialChannel: false,
      content: 'Hello world!',
      contentType: 'text',
      impression: 38,
      createdAt: '2023-11-08T14:36:28.828Z',
      __v: 0,
      receivers: [],
      posReac: 0,
      negReac: 0,
      convertedDate: '10 Novembre 2023',
    },
    {
      _id: '654d04b3404cbfb491706a5f',
      author: '651d64ffba243e0813e502dd',
      publicSqueal: true,
      officialChannel: false,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      contentType: 'text',
      impression: 28,
      createdAt: '2023-11-09T16:11:31.950Z',
      __v: 0,
      receivers: [],
      posReac: 0,
      negReac: 0,
      convertedDate: '10 Novembre 2023',
    },
    {
      _id: '654e58f784a3395ec5f285d9',
      author: '651d64ffba243e0813e502dd',
      publicSqueal: true,
      officialChannel: false,
      content: '44.476662507415725,11.363996484504412',
      contentType: 'geolocalization',
      impression: 21,
      createdAt: '2023-11-10T16:23:19.322Z',
      __v: 0,
      receivers: [],
      posReac: 0,
      negReac: 0,
      convertedDate: '10 Novembre 2023',
    },
  ];

  displayedSqueals: SquealsInfo[] = this.squeals;
 */

  constructor(private sharedService: SharedService, private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<GetSquealsResponse[]>(
        'http://localhost:3500/api/users/' +
          sessionStorage.getItem('vipId') +
          '/squeals'
      )
      .pipe(
        catchError((error: any) => {
          console.error('Si è verificato un errore:', error);
          return throwError('Errore gestito');
        })
      )
      .subscribe((data) => {
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
            convertedDate: '', // Inizializzeremo con convertDate
            neg0Reac: 0,
            neg1Reac: 0,
            pos2Reac: 0,
            pos3Reac: 0,
            weightedPosReac: 0,
            weightedNegReac: 0,
            __v: squeal.__v,
          };
        });
        this.squeals.forEach((squeal) => {
          this.convertDate(squeal);
          this.getReactions(squeal);
        });

        this.displayedSqueals = this.squeals;
      });
  }

  getReactions(squeal: SquealsInfo) {
    this.http
      .get<GetReactionResponse>(
        'http://localhost:3500/api/squeals/' + squeal._id + '/reactions'
      )
      .pipe(
        catchError((error: any) => {
          console.error('Si è verificato un errore:', error);
          return throwError('Errore gestito');
        })
      )
      .subscribe((data) => {
        squeal.neg0Reac = data.neg0Reac;
        squeal.neg1Reac = data.neg1Reac;
        squeal.pos2Reac = data.pos2Reac;
        squeal.pos3Reac = data.pos3Reac;
        squeal.weightedPosReac = data.pos2Reac + data.pos3Reac * 2;
        squeal.weightedNegReac = data.neg0Reac * 2 + data.neg1Reac;
      });
  }

  applyFilter(filterParams: FilterParams) {
    let filteredSqueals: SquealsInfo[] = [];
    if (filterParams.contentTypes.includes('all')) {
      filteredSqueals = this.squeals;
    } else {
      // Filtra gli squeals in base ai tipi di contenuto selezionati
      filteredSqueals = this.squeals.filter((squeal) =>
        filterParams.contentTypes.includes(squeal.contentType)
      );
    }

    //mancano case 'liked' e 'disliked'
    switch (filterParams.orderBy) {
      case 'recent':
        filteredSqueals = filteredSqueals.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
        break;
      case 'oldest':
        filteredSqueals = filteredSqueals.sort((a, b) => {
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        });
        break;
      case 'viewed':
        filteredSqueals = filteredSqueals.sort((a, b) => {
          return b.impression - a.impression;
        });
        break;
      case 'unviewed':
        filteredSqueals = filteredSqueals.sort((a, b) => {
          return a.impression - b.impression;
        });
        break;
      case 'liked':
        filteredSqueals = filteredSqueals.sort((a, b) => {
          return b.weightedPosReac - a.weightedPosReac;
        });
        break;
      case 'disliked':
        filteredSqueals = filteredSqueals.sort((a, b) => {
          return b.weightedNegReac - a.weightedNegReac;
        });
        break;
      default:
        // Se l'opzione di ordinamento non è riconosciuta, mantieni l'ordine attuale
        break;
    }

    this.displayedSqueals = filteredSqueals;
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
}
