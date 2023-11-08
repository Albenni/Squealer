import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { GetSquealsResponse } from '../shared-interfaces';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent {
  //squeals: GetSquealsResponse[] = [];
  squeals: GetSquealsResponse[] = [
    {
      _id: '6548e23a7faecfb150cfd657',
      author: '651d64ffba243e0813e502dd',
      publicSqueal: true,
      group: [],
      officialChannel: false,
      content: 'https://picsum.photos/200',
      contentType: 'image',
      impression: 8,
      createdAt: '2023-11-06T12:55:22.315Z',
      __v: 0,
    },
    {
      _id: '6548e2497faecfb150cfd65b',
      author: '651d64ffba243e0813e502dd',
      publicSqueal: true,
      group: [],
      officialChannel: false,
      content: 'https://picsum.photos/200',
      contentType: 'image',
      impression: 8,
      createdAt: '2023-11-06T12:55:37.362Z',
      __v: 0,
    },
    {
      _id: '6548e24a7faecfb150cfd65f',
      author: '651d64ffba243e0813e502dd',
      publicSqueal: true,
      group: [],
      officialChannel: false,
      content: 'https://picsum.photos/200',
      contentType: 'image',
      impression: 8,
      createdAt: '2023-11-06T12:55:38.067Z',
      __v: 0,
    },
    {
      _id: '654b9cec15e2330c700374c6',
      author: '651d64ffba243e0813e502dd',
      publicSqueal: true,
      group: [],
      officialChannel: false,
      content: 'Hello world!',
      contentType: 'text',
      impression: 1,
      createdAt: '2023-11-08T14:36:28.828Z',
      __v: 0,
    },
  ];

  constructor(private sharedService: SharedService, private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<GetSquealsResponse[]>(
        'http://localhost:3500/users/' +
          this.sharedService.selectedVipId +
          '/squeals'
      )
      .pipe(
        catchError((error: any) => {
          console.error('Si è verificato un errore:', error);
          return throwError('Errore gestito');
        })
      )
      .subscribe((data) => {
        // this.squeals = data;
        console.log(this.squeals);
      });
  }
}
