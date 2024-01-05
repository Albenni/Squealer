import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-channel-selector',
  templateUrl: './channel-selector.component.html',
  styleUrls: ['./channel-selector.component.css'],
})
export class ChannelSelectorComponent {
  channelChoice: string = '§';

  receivers: { id: string; type: string; channel:string }[] = [];
  receiversNumber: number = 0;

  receiverExists: boolean = false;
  receiverId: string = '';
  receiverInexistentError:boolean  = false
  
  constructor(private http: HttpClient) {}

  async addReceiver() {
    const inputElement = document.querySelector<HTMLInputElement>('#inputReceiver');
    if (!inputElement || inputElement.value.trim() === '') return;
  
    const receiverName = inputElement.value;
    const receiverType = this.channelChoice === '§' ? 'channel' : 'keyword';
  
    const receiverExists = await this.checkReceiver(receiverName, receiverType);
    

    if (receiverExists) {
      this.receiversNumber ++
      this.receiverInexistentError = false
      const receiver = {
        id: this.receiverId,
        type: receiverType,
        channel: this.channelChoice + receiverName
      };

      this.receivers.push(receiver);
      inputElement.value = '';
    } else {
      // Handle the case where the receiver does not exist
      this.receiverInexistentError = true
      inputElement.value = '';
    }
  }
  
  deleteReceiver(index: number) {
    if (index > -1 && index < this.receivers.length) {
      this.receivers.splice(index, 1);
      this.receiversNumber--; // Update the count of receivers
    }
    console.log (this.receiversNumber)
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
  

  chooseChannel(channel: string) {
    this.channelChoice = channel;
  }
}
