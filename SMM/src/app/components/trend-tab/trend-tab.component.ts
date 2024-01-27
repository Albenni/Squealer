import {
  Component,
  SimpleChanges,
  Input,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import {
  SquealsResponse,
  SquealsInfo,
  GetReactionResponse,
  GetCommentResponse,
} from '../../shared-interfaces';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { API_CONFIG } from 'src/app/api.config';
@Component({
  selector: 'app-trend-tab',
  templateUrl: './trend-tab.component.html',
  styleUrls: ['./trend-tab.component.css'],
})
export class TrendTabComponent {
  @Input() refreshFeed: boolean = false;

  modalRef?: BsModalRef;
  @ViewChild('infosModal') infosModal?: TemplateRef<any>;

  getSqueals: SquealsResponse[] = [];
  squeals: SquealsInfo[] = [];
  existSqueals: boolean = false;


  mostPopularSqueal: SquealsInfo = {} as SquealsInfo;
  leastPopularSqueal: SquealsInfo = {} as SquealsInfo;
  mostViewedSqueal: SquealsInfo = {} as SquealsInfo;
  leastViewedSqueal: SquealsInfo = {} as SquealsInfo;
  shortestSqueal: SquealsInfo = {} as SquealsInfo;
  longestSqueal: SquealsInfo = {} as SquealsInfo;
  mostInteractedSqueal: SquealsInfo = {} as SquealsInfo;
  leastInteractedSqueal: SquealsInfo = {} as SquealsInfo;
  monthlySqueal: SquealsInfo = {} as SquealsInfo;

  commentsNumber: number[] = [];
  feedIndex: number = 0;

  constructor(private http: HttpClient, private modalService: BsModalService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['refreshFeed'] &&
      changes['refreshFeed'].currentValue !==
        changes['refreshFeed'].previousValue
    ) {
      this.uploadSqueals();
    }
  }

  uploadMoreSqueals() {
    const url =
      API_CONFIG.url +
      'users/' +
      sessionStorage.getItem('vipId') +
      '/squeals/smm' +
      '?index=' +
      this.feedIndex;

    this.http
      .get<SquealsResponse[]>(url)
      .pipe(
        catchError((error: any) => {
          console.error('Si è verificato un errore:', error);
          return throwError('Errore gestito');
        })
      )
      .subscribe((data) => {
        if (data) {
          this.getSqueals = data;
          this.getSqueals.forEach((squeal) => {
            this.squeals.push({
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
            });
          });

          const reactionPromises = this.squeals.map((squeal) => {
            this.convertDate(squeal);
            return this.getReactions(squeal);
          });

          Promise.all(reactionPromises).then(() => {
            this.getSquealsInfo();
          });

          if (this.squeals.length === 10 * (this.feedIndex + 1)) {
            this.feedIndex += 1;
            this.uploadMoreSqueals();
          }

        }
      
      });
      }

  private uploadSqueals() {
    this.http
      .get<SquealsResponse[]>(
        API_CONFIG.url + 'users/' +
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
          this.existSqueals = true;
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
          });
          if (this.squeals.length === 10 * (this.feedIndex + 1)) {
            this.feedIndex += 1;
            this.uploadMoreSqueals();
          }
        } else {
          this.existSqueals = false;
          this.getSqueals = [];
          this.squeals = [];
          this.mostPopularSqueal = {} as SquealsInfo;
          this.leastPopularSqueal = {} as SquealsInfo;
          this.mostViewedSqueal = {} as SquealsInfo;
          this.leastViewedSqueal = {} as SquealsInfo;
          this.shortestSqueal = {} as SquealsInfo;
          this.longestSqueal = {} as SquealsInfo;
          this.monthlySqueal = {} as SquealsInfo; 
          this.mostInteractedSqueal = {} as SquealsInfo;
          this.leastInteractedSqueal = {} as SquealsInfo;
        }
      });
  }

  getSquealsInfo() {
    this.mostPopularSqueal = this.squeals.reduce((prev, current) => {
      return prev.weightedPosReac > current.weightedPosReac ? prev : current;
    });

    this.leastPopularSqueal = this.squeals.reduce((prev, current) => {
      return prev.weightedNegReac > current.weightedNegReac ? prev : current;
    });

    this.mostViewedSqueal = this.squeals.reduce((prev, current) => {
      return prev.impression > current.impression ? prev : current;
    });

    this.leastViewedSqueal = this.squeals.reduce((prev, current) => {
      return prev.impression < current.impression ? prev : current;
    });

    this.mostInteractedSqueal = this.squeals.reduce((prev, current) => {
      if(current.weightedNegReac === 0 && current.weightedPosReac == 0) return prev
      const prevWeight =
        (prev.weightedPosReac - prev.weightedNegReac) / prev.impression;
      const currentWeight =
        (current.weightedPosReac - current.weightedNegReac) / current.impression;
      return prevWeight > currentWeight ? prev : current;
    });

    this.leastInteractedSqueal = this.squeals.reduce((prev, current) => {
      if(current.weightedNegReac === 0 && current.weightedPosReac == 0) return current
      const prevWeight =
        (prev.weightedPosReac - prev.weightedNegReac) / prev.impression;
      const currentWeight =
        (current.weightedPosReac - current.weightedNegReac) / current.impression;
      return prevWeight < currentWeight ? prev : current;
    });


    const textSqueals = this.squeals.filter(
      (squeal) => squeal.contentType === 'text'
    );

    if (textSqueals.length > 0) {
      this.shortestSqueal = textSqueals.reduce((prev, current) => {
        return prev.content.length < current.content.length ? prev : current;
      });
    } else {
      this.shortestSqueal = {} as SquealsInfo;
    }

    if (textSqueals.length > 0) {
      this.longestSqueal = textSqueals.reduce((prev, current) => {
        return prev.content.length > current.content.length ? prev : current;
      });
    } else {
      this.longestSqueal = {} as SquealsInfo;
    }

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    let previousMonth = currentMonth - 1;
    let previousYear = currentYear;
    if (previousMonth < 0) {
      previousMonth = 11; // December is index 11 in JavaScript's Date
      previousYear -= 1;
    }
    const squealsFromPreviousMonth = this.squeals.filter((squeal) => {
      const squealDate = new Date(squeal.createdAt);

      return (
        squealDate.getMonth() === previousMonth &&
        squealDate.getFullYear() === previousYear
      );
    });

    Promise.all(
      squealsFromPreviousMonth.map((squeal) => this.getComments(squeal))
    ).then((commentsNumber) => {
      if (squealsFromPreviousMonth.length > 0) {
        this.monthlySqueal = squealsFromPreviousMonth.reduce(
          (prev, current, index) => {
            const prevWeight =
              prev.weightedPosReac -
              prev.weightedNegReac +
              prev.impression +
              commentsNumber[index];
            const currentWeight =
              current.weightedPosReac -
              current.weightedNegReac +
              current.impression +
              commentsNumber[index];
            return prevWeight > currentWeight ? prev : current;
          }
        );
      } else {
        this.monthlySqueal = {} as SquealsInfo;
      }
    });
  }

  getComments(squealPrevMonth: SquealsInfo): Promise<number> {
    return this.http
      .get<GetCommentResponse[]>(
        API_CONFIG.url + 'squeals/' + squealPrevMonth._id + '/comments'
      )
      .pipe(
        catchError((error: any) => {
          console.error('Si è verificato un errore:', error);
          return of([]); // Return an empty array on error
        })
      )
      .toPromise()
      .then((data) => (data ? data.length : 0));
  }
  get isShortestSquealNotEmpty(): boolean {
    return Object.keys(this.shortestSqueal).length > 0;
  }

  get isLongestSquealNotEmpty(): boolean {
    return Object.keys(this.longestSqueal).length > 0;
  }

  get isMonthlySquealNotEmpty(): boolean {
    return Object.keys(this.monthlySqueal).length > 0;
  }
  openInfosModal() {
    this.modalRef = this.modalService.show(this.infosModal!, {
      class: 'modal-md',
    });
  }

  getReactions(squeal: SquealsInfo): Promise<SquealsInfo> {
    return this.http
      .get<GetReactionResponse>(
        API_CONFIG.url + 'squeals/' + squeal._id + '/reactions'
      )
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
