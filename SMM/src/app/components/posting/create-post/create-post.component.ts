import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../../services/shared.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {
  GetCharsResponse,
  Characters,
  GetSquealsResponse,
} from '../../../shared-interfaces';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  channelChoice: string = '@';
  contentChoice: string = '';
  activePubTab: string = 'pubblico';

  textValue: string = '';
  imgValue: string | File | null = null;
  videoValue: string | File | null = null;
  locationValue: string = '';

  vipProfilePic: string = sessionStorage.getItem('vipProfilePic')!;
  vipUsername: string = sessionStorage.getItem('vipUsername')!;
  vipName: string = sessionStorage.getItem('vipName')!;
  vipSurname: string = sessionStorage.getItem('vipSurname')!;

  characters: Characters = {
    daily: 0,
    weekly: 0,
    monthly: 0,
  };
  countChars: Characters = {
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
        this.countChars.daily = data.dailyChar;
        this.countChars.weekly = data.weeklyChar;
        this.countChars.monthly = data.monthlyChar;
      });
  }
  post() {
    const formData: FormData = new FormData();
    formData.append('contentType', this.contentChoice);
    formData.append('publicSqueal', true.toString());
    if (this.contentChoice === 'text') {
      formData.append('content', this.textValue);
    } else if (this.contentChoice === 'geolocalization') {
      formData.append('content', this.locationValue);
    } else if (this.contentChoice === 'image') {
      if (this.imgValue != null) {
        if (typeof this.imgValue === 'string') {
          formData.append('content', this.imgValue);
        } else {
          formData.append('squeal', this.imgValue);
        }
      }
    } else if (this.contentChoice === 'video') {
      if (this.videoValue != null) {
        if (typeof this.videoValue === 'string') {
          formData.append('content', this.videoValue);
        } else {
          formData.append('squeal', this.videoValue);
        }
      }
    }

    console.log(formData.getAll('squeal'));

    const url: string =
      'http://localhost:3500/api/users/' +
      sessionStorage.getItem('vipId') +
      '/squeals';
    this.http.post<GetSquealsResponse>(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).pipe(
      catchError((error: any) => {
        console.error('Si è verificato un errore:', error);
        return throwError('Errore gestito');
      })
    ).subscribe((data) => {
      console.log('Successo');
      this.modalRef?.hide();
    });
  }
  
  chooseChannel(channel: string) {
    this.channelChoice = channel;
  }
  chooseContent(content: string) {
    this.contentChoice = content;
    this.countChars.daily = this.characters.daily;
    this.countChars.weekly = this.characters.weekly;
    this.countChars.monthly = this.characters.monthly;
  }

  onTextChange(textValue: string): void {
    this.textValue = textValue;
    this.countChars.daily = this.characters.daily - textValue.length;
    this.countChars.weekly = this.characters.weekly - textValue.length;
    this.countChars.monthly = this.characters.monthly - textValue.length;
  }
  onImgChange(imgData: string | File): void {
    this.imgValue = imgData;
  }
  onVideoChange(videoData: string | File): void {
    console.log(videoData);
    this.videoValue = videoData;
  }
  onLocationChange(location: string): void {
    console.log(location);
    this.locationValue = location;
  }
}
