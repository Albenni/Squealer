import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reactions-card-header',
  templateUrl: './reactions-card-header.component.html',
  styleUrls: ['./reactions-card-header.component.css']
})
export class ReactionsCardHeaderComponent {
  @Input() neg0Reac: number = 0;
  @Input() neg1Reac: number = 0;
  @Input() pos2Reac: number= 0 ;
  @Input() pos3Reac: number = 0; 
}
