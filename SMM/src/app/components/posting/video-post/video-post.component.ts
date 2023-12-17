import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-video-post',
  templateUrl: './video-post.component.html',
  styleUrls: ['./video-post.component.css'],
})
export class VideoPostComponent {
  @Input() videoUrl: string = '';
}
