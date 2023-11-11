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
    'Comprare caratteri aggiuntivi costa * a carattere. È possibile comprare caratteri di emergenza se si sta scrivendo uno Squeal e si finiscono i caratteri, i caratteri di emergenza vengono pagati dopo aver postato ad un prezzo maggiorato di ** per carattere.';

  usageText =
    'I caratteri di testo pesano 1 carattere ognuno mentre immagini, video e georeferenziazioni pesano 125 caratteri ciascuno .';

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
