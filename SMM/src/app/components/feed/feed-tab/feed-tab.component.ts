import {
  Component,
  Input,
  SimpleChanges,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import {
  SquealsResponse,
  FilterParams,
  SquealsInfo,
  GetReactionResponse,
  GetCommentResponse,
  CommentInfo,
  GetInfosVip,
  ReceiverInfo,
  Receiver,
} from '../../../shared-interfaces';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError, map } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
@Component({
  selector: 'app-feed-tab',
  templateUrl: './feed-tab.component.html',
  styleUrls: ['./feed-tab.component.css'],
  providers: [
    {
      provide: BsDropdownConfig,
      useValue: { isAnimated: true, autoClose: true },
    },
  ],
})
export class FeedTabComponent {
  modalRef?: BsModalRef;

  @Input() refreshFeed: boolean = false;
  @ViewChild('deleteModal') deleteModal?: TemplateRef<any>;
  @ViewChild('commentModal') commentModal?: TemplateRef<any>;

  getSqueals: SquealsResponse[] = [];
  squeals: SquealsInfo[] = [];
  displayedSqueals: SquealsInfo[] = [];

  comments: GetCommentResponse[] = [];
  displayedComments: CommentInfo[] = [];
  displayedReceivers: ReceiverInfo[][] = [];
  idPostToDelete: string = '';

  existComments: boolean = false;

  constructor(
    private sharedService: SharedService,
    private http: HttpClient,
    private modalService: BsModalService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['refreshFeed'] &&
      changes['refreshFeed'].currentValue !==
        changes['refreshFeed'].previousValue
    ) {
      this.uploadSqueals();
    }
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

          this.squeals.forEach((squeal, index) => {
            this.convertDate(squeal);
            this.getReactions(squeal);
            this.displayedReceivers[index] = this.convertReceivers(
              squeal.receivers
            );
          });

          this.displayedSqueals = this.squeals;
        } else {
          this.getSqueals = [];
          this.squeals = [];
          this.displayedSqueals = [];
        }
        console.log(this.displayedReceivers);
      });
  }

  convertReceivers(receivers: Receiver[]): ReceiverInfo[] {
    if (receivers.length === 0) {
      // If the receivers array is empty, return an empty array
      return [];
    } else {
      // Convert each receiver to ReceiverInfo format
      return receivers.map((receiver) => {
        return {
          _id: receiver._id,
          groupType: receiver.groupType,
          group: {
            _id: receiver.group._id,
            infoName: receiver.group.name,
            private: receiver.group.private,
            editorialChannel: receiver.group.editorialChannel,
            profilePic: receiver.group.profilePic,
          },
        };
      });
    }
  }

  removeReceiver(squealId: string, receiverId: string) {
    //receiverIndex is the index of the receiver in a single squeal
    const url = 'http://localhost:3500/api/squeals/' + squealId + '/receivers'+ '/' + receiverId;

    console.log(url);

    this.http.delete(url).pipe(
      catchError((error: any) => {
        console.error('Si è verificato un errore:', error);
        return throwError('Errore gestito');
      })
    ).subscribe((data) => {
      this.uploadSqueals();
    });
  }
  addReceiver(squealId: string) {

    const receiverId = ''
/*     (<HTMLInputElement>document.getElementById('receiverId')).value;
 */    const url = 'http://localhost:3500/api/squeals/' + squealId + '/receivers'+ '/' + receiverId;

    this.http.delete(url).pipe(
      catchError((error: any) => {
        console.error('Si è verificato un errore:', error);
        return throwError('Errore gestito');
      })
    ).subscribe((data) => {
      this.uploadSqueals();
    });
  }
  openConfirmationModal(squealIndex: number) {}
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
  openDeleteModal(index: number) {
    this.idPostToDelete = this.squeals[index]._id;
    this.modalRef = this.modalService.show(this.deleteModal!, {
      class: 'modal-sm',
    });
  }

  openCommentModal(index: number) {
    this.uploadComments(this.squeals[index]._id);
    this.modalRef = this.modalService.show(this.commentModal!, {
      class: 'modal-md',
    });
  }

  uploadComments(idPost: string) {
    this.http
      .get<GetCommentResponse[]>(
        'http://localhost:3500/api/squeals/' + idPost + '/comments'
      )
      .pipe(
        catchError((error: any) => {
          console.error('Si è verificato un errore:', error);
          return throwError('Errore gestito');
        })
      )
      .subscribe((data) => {
        if (data === null) {
          this.existComments = false;
        } else {
          this.existComments = true;
          this.comments = data;

          this.displayedComments = this.comments.map((comment) => {
            return {
              usernameAuthor: '',
              content: comment.content,
            };
          });
          this.comments.forEach((comment, index) => {
            this.http
              .get<GetInfosVip>(
                'http://localhost:3500/api/users/' + comment.author
              )
              .pipe(
                catchError((error: any) => {
                  console.error('Si è verificato un errore:', error);
                  return throwError('Errore gestito');
                })
              )
              .subscribe((data) => {
                this.displayedComments[index].usernameAuthor = data.username;
              });
          });
        }
      });
  }

  confirmDeletePost() {
    this.http
      .delete<SquealsResponse>(
        'http://localhost:3500/api/squeals/' + this.idPostToDelete
      )
      .pipe(
        catchError((error: any) => {
          console.error('Si è verificato un errore:', error);
          return throwError('Errore gestito');
        })
      )
      .subscribe((data) => {
        this.modalRef?.hide();
        this.uploadSqueals();
        this.idPostToDelete = '';
      });
  }

  applyFilter(filterParams: FilterParams) {
    let filteredSqueals: SquealsInfo[] = [];
    if (filterParams.contentTypes.includes('all')) {
      filteredSqueals = this.squeals;
    } else {
      filteredSqueals = this.squeals.filter((squeal) =>
        filterParams.contentTypes.includes(squeal.contentType)
      );
    }

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
        break;
    }

    this.displayedSqueals = filteredSqueals;
  }
}
