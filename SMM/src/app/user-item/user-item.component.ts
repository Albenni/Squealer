import { Component, Input } from '@angular/core';
import { AvatarComponent } from '@coreui/angular';
@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent {
  @Input() userProfileImage: string = '';
  @Input() username: string = '';
}
