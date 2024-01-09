import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-channel-selector',
  templateUrl: './channel-selector.component.html',
  styleUrls: ['./channel-selector.component.css'],
})
export class ChannelSelectorComponent {
  @Output() receiversChange = new EventEmitter<{ id: string; type: string; channel: string }[]>();

  channelChoice: string = '§';

  receivers: { id: string; type: string; channel:string }[] = [];
  receiversNumber: number = 0;

  receiverExists: boolean = false;
  receiverId: string = '';
  receiverInexistentError:boolean  = false
  receiverDuplicateError:boolean = false
  
  constructor(private http: HttpClient) {
  }

  updateReceivers() {
    this.receiversChange.emit(this.receivers);
  }

  async addReceiver(event:Event) {
    event.stopPropagation();

    const inputElement = document.querySelector<HTMLInputElement>('#inputReceiver');
    if (!inputElement || inputElement.value.trim() === '') return;
  
    const receiverName = inputElement.value;
    const receiverType = this.channelChoice === '§' ? 'channel' : 'keyword';
    const receiverTypeUppercase  = this.channelChoice === '§' ? 'Channel' : 'Keyword';
    if (this.checkDuplicateReceiver(receiverName)) {
      this.receiverDuplicateError = true
      inputElement.value = '';
      return
    }
    this.receiverDuplicateError = false

    const receiverExists = await this.checkReceiver(receiverName, receiverType);
    

    if (receiverExists) {
      this.receiversNumber ++
      this.receiverInexistentError = false
      const receiver = {
        id: this.receiverId,
        type: receiverTypeUppercase,
        channel: this.channelChoice + receiverName
      };

      this.updateReceivers();
      this.receivers.push(receiver);
      inputElement.value = '';
    } else {
      // Handle the case where the receiver does not exist
      this.receiverInexistentError = true
      inputElement.value = '';
    }
  }

  checkDuplicateReceiver(receiverName: string): boolean {

    const recCheck = this.channelChoice + receiverName

    for (let i = 0; i < this.receivers.length; i++) {
      if (this.receivers[i].channel === recCheck) {
        return true
      }
    }

    return false
  }
  
  deleteReceiver(index: number, event: Event) {
    event.stopPropagation();

    if (index > -1 && index < this.receivers.length) {
      this.receivers.splice(index, 1);
      this.receiversNumber--; // Update the count of receivers
      this.updateReceivers();
    }
    }
  
  checkReceiver(receiverName: string, receiverType: string): Promise<boolean> {
    let apiType = this.channelChoice === '§' ? 'channels' : 'keywords';
  
    let url = `http://localhost:3500/api/${apiType}?${receiverType}=${receiverName}&exactMatch=true`;
  
    return this.http
      .get(url, { observe: 'response' })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error('Error in checkReceiver'));
        })
      )
      .toPromise()
      .then((response: any) => {
        this.receiverId = response.body._id;
        return response.status === 200;
      })
      .catch(() => false);
  }
  

  chooseChannel(channel: string, event: Event) {
    event.stopPropagation();
    this.channelChoice = channel;
  }
  stopEventPropagation(event: Event): void {
    event.stopPropagation();
  }
}
