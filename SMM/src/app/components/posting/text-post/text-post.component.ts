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

  textValue: string = '';
  onInputChange(): void {
    this.countChars.daily = this.characters.daily - this.textValue.length;
    this.countChars.weekly = this.characters.weekly - this.textValue.length;
    this.countChars.monthly = this.characters.monthly - this.textValue.length;
    this.textChange.emit(this.textValue);
  }
}
