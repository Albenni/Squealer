import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../services/shared.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { GetCharsResponse, Characters } from '../../shared-interfaces';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  activePubTab: string = 'pubblico';
  characters: Characters = {
    daily: 0,
    weekly: 0,
    monthly: 0,
  };

  modalRef?: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.getChars();
  }

  openPostModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getChars() {
    this.http
      .get<GetCharsResponse>(
        'http://localhost:3500/api/users/' +
          sessionStorage.getItem('vipId') +
          '/charAvailable'
      )
      .pipe(
        catchError((error: any) => {
          // Gestisci l'errore qui
          console.error('Si è verificato un errore:', error);
          return throwError('Errore gestito');
        })
      )
      .subscribe((data) => {
        this.characters.daily = data.dailyChar;
        this.characters.weekly = data.weeklyChar;
        this.characters.monthly = data.monthlyChar;
      });
  }
  post() {
  }
}
