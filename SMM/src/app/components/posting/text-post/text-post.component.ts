import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Characters } from 'src/app/shared-interfaces';
@Component({
  selector: 'app-text-post',
  templateUrl: './text-post.component.html',
  styleUrls: ['./text-post.component.css']
})
export class TextPostComponent {
  @Input() countChars: Characters = {
    daily: 0,
    weekly: 0,
    monthly: 0,
  };
  @Input() characters: Characters = {
    daily: 0,
    weekly: 0,
    monthly: 0,
  };
  @Output() textChange: EventEmitter<string> = new EventEmitter();
  @Output() tooManyEmergencyChars: EventEmitter<boolean> = new EventEmitter();

  maxLengthChars: number = 0;
  textValue: string = '';
  ngOnInit() {
    this.maxLengthChars = this.maxLength();
  }
  onInputChange(): void {

    this.countChars.daily = this.characters.daily - this.textValue.length;
    this.countChars.weekly = this.characters.weekly - this.textValue.length;
    this.countChars.monthly = this.characters.monthly - this.textValue.length;

    if( this.countChars.daily < -199 || this.countChars.weekly < -199 || this.countChars.monthly < -199){
      this.tooManyEmergencyChars.emit(true);
    } else {
      this.tooManyEmergencyChars.emit(false);
    }
      this.textChange.emit(this.textValue);
  }

  maxLength(){
    let min = Math.min(this.characters.daily,this.characters.weekly,this.characters.monthly);
    return min+200;
  }
}
