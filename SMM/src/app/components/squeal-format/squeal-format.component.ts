import { Component, Input } from '@angular/core';
import { SquealsInfo } from 'src/app/shared-interfaces';

@Component({
  selector: 'app-squeal-format',
  templateUrl: './squeal-format.component.html',
  styleUrls: ['./squeal-format.component.css']
})
export class SquealFormatComponent {
  @Input() squealInput: SquealsInfo = {} as SquealsInfo;
  
  getColor(category: string): string {
    switch (category) {
      case 'popolare':
        return 'green';
      case 'impopolare':
        return 'red';
      case 'controverso':
        return 'sandybrown';
      default:
        return 'black'; // default color
    }
  }
}
