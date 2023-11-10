import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-character-displayer',
  templateUrl: './character-displayer.component.html',
  styleUrls: ['./character-displayer.component.css'],
})
export class CharacterDisplayerComponent {
  @Input() dailyChars: number = 0;
  @Input() weeklyChars: number = 0;
  @Input() monthlyChars: number = 0;

  dailyAlert: number = 100;
  weeklyAlert: number = 700;
  monthlyAlert: number = 3000;
}
