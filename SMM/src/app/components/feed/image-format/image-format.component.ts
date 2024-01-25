import { Component, Input } from '@angular/core';
import { API_CONFIG } from 'src/app/api.config';
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
    this.sourceImage = API_CONFIG.noapiurl + 'squeal/' + this.idImage + this.format;
  }
}
