import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() postTitle: string='';
  @Input() content: string = '';
  @Input() isImage: boolean = false;
}
