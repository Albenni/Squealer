import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-video-format',
  templateUrl: './video-format.component.html',
  styleUrls: ['./video-format.component.css']
})
export class VideoFormatComponent {
  @Input() format: string = '';
  @Input() idVideo: string = '';

  formatVideo: string = '';
  sourceVideo: string = '';

  constructor() { }

  ngOnInit(): void {
    this.formatVideo = 'video/'+this.format.split('.')[1];
    this.sourceVideo = 'http://localhost:3500/squeal/'+this.idVideo+this.format;
  }
}
