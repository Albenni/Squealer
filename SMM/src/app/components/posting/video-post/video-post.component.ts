import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-video-post',
  templateUrl: './video-post.component.html',
  styleUrls: ['./video-post.component.css'],
})
export class VideoPostComponent {
  @Output() videoChange: EventEmitter<string | File> = new EventEmitter<
    string | File
  >();
  videoUrl: string = '';
  selectedFile: File | null = null;

  onUrlChange(fileInput: HTMLInputElement): void {
    this.selectedFile = null; 
    fileInput.value = ''; 
    if (this.videoUrl.trim() === '') {
      console.log('Empty URL');
      return;
    }

    const videoUrlRegex = /(https?:\/\/.*\.(?:mp4|avi|mov|wmv|flv|mkv))/i;
    if (videoUrlRegex.test(this.videoUrl)) {
      this.videoChange.emit(this.videoUrl);
      console.log('URL Valid: ' + this.videoUrl);
    } else {
      console.log('Not a valid video URL');
    }
  }

  onFileSelected(event: any, fileInput: HTMLInputElement): void {
    this.videoUrl = ''; // Clear URL input when a file is selected
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const selectedFileType = files[0].type;
      if (selectedFileType.startsWith('video/')) {
        this.selectedFile = files[0];
        this.videoChange.emit(this.selectedFile);
        console.log('Video file selected:', this.selectedFile);
      } else {
        this.selectedFile = null;
        fileInput.value = ''; // Reset the file input field
        alert('Only video files are allowed');
      }
    }
  }
}
