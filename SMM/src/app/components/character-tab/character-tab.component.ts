import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Characters } from 'src/app/shared-interfaces';
@Component({
  selector: 'app-character-tab',
  templateUrl: './character-tab.component.html',
  styleUrls: ['./character-tab.component.css']
})
export class CharacterTabComponent {
  @Input() dailyChars: number = 0;
  @Input() weeklyChars: number = 0;
  @Input() monthlyChars: number = 0;

  characters: Characters = {
    daily: 0,
    weekly: 0,
    monthly: 0,
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dailyChars']) {
      this.characters['daily'] = this.dailyChars;
    }

    if (changes['weeklyChars']) {
      this.characters['weekly'] = this.weeklyChars;
    }

    if (changes['monthlyChars']) {
      this.characters['monthly'] = this.monthlyChars;
    }
  }
}
