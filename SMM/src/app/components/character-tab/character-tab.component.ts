import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Characters } from 'src/app/shared-interfaces';
@Component({
  selector: 'app-character-tab',
  templateUrl: './character-tab.component.html',
  styleUrls: ['./character-tab.component.css'],
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
  pricesText =
    'Caratteri extra? 0.04€ ciascuno. A corto mentre scrivi uno Squeal? Usa caratteri di emergenza e paga dopo a 0.1€ per ciascuno! #SmartWriting #SquealSmart';
  usageText =
    'Testo = 1 carattere per simbolo (es. 300 caratteri = 300). Immagini, video e geotag = 125 ciascuno. #BudgetYourCharacters #SocialStrategy';
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
