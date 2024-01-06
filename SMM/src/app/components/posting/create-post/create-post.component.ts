import {
  Component,
  TemplateRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../../../services/shared.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {
  GetCharsResponse,
  Characters,
  SquealsResponse,
} from '../../../shared-interfaces';
import { ChannelSelectorComponent } from '../channel-selector/channel-selector.component';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  contentChoice: string = '';
  activePubTab: string = 'pubblico';

  textValue: string = '';
  imgValue: string | File | null = null;
  videoValue: string | File | null = null;
  locationValue: string = '';

  vipProfilePic: string = '';
  vipUsername: string = '';
  vipName: string = '';
  vipSurname: string = '';

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

  receivers: { id: string; type: string; channel: string }[] = [];

  modalRef?: BsModalRef;

  @ViewChild(ChannelSelectorComponent)
  channelSelector?: ChannelSelectorComponent;

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.getChars();
  }

  ngAfterViewInit() {}

  async post() {
    const formData: FormData = new FormData();
    formData.append('contentType', this.contentChoice);
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

    if (this.activePubTab == 'privato') {
      if (this.receivers.length != 0) {
        const receiversToAppend = this.receivers.map((channel) => {
          return {
            group: channel.id,
            groupType: channel.type,
          };
        });
        formData.append('receivers', JSON.stringify(receiversToAppend));
      }
      formData.append('publicSqueal', 'false');
    } else {
      formData.append('publicSqueal', 'true');
    }

      const url = `http://localhost:3500/api/users/${sessionStorage.getItem(
        'vipId'
      )}/squeals`;

      this.http.post<SquealsResponse>(url, formData).pipe(
        catchError((error: any) => {
          console.error('Si è verificato un errore:', error);
          return throwError('Errore gestito');
        })
      ).subscribe((data) => {
        this.modalRef?.hide();
        location.reload();
      });
    
  }

  updateReceivers(receivers: { id: string; type: string; channel: string }[]) {
    this.receivers = receivers;
  }

  openPostModal(template: TemplateRef<any>) {
    this.vipName = sessionStorage.getItem('vipName')!;
    this.vipSurname = sessionStorage.getItem('vipSurname')!;
    this.vipUsername = sessionStorage.getItem('vipUsername')!;
    this.vipProfilePic = sessionStorage.getItem('vipProfilePic')!;
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
    this.videoValue = videoData;
  }
  onLocationChange(location: string): void {
    this.locationValue = location;
  }
}
