import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-format',
  templateUrl: './image-format.component.html',
  styleUrls: ['./image-format.component.css'],
})
export class ImageFormatComponent {
  @Input() format: string = '';
  @Input() idImage: string = '';

  formatImage: string = '';
  sourceImage: string = '';

  constructor() {}

  ngOnInit(): void {
    this.formatImage = 'image/' + this.format.split('.')[1];
    this.sourceImage = 'http://localhost:3500/squeal/' + this.idImage + this.format;
  }
}
