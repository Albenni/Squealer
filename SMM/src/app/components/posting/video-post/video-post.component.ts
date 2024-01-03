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
  isFileSelected: boolean = false;
  fileToShow:string = '';

  ngOnDestroy(): void {
    if (this.fileToShow) {
      URL.revokeObjectURL(this.fileToShow);
    }
  }
  

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
    this.videoUrl = '';
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const selectedFileType = files[0].type;
      if (selectedFileType.startsWith('video/')) {
        this.selectedFile = files[0];
        const objectUrl = URL.createObjectURL(this.selectedFile);

        this.videoChange.emit(this.selectedFile);
        console.log('Video file selected:', this.selectedFile);
        this.isFileSelected = true;
        this.fileToShow = objectUrl;

      } else {
        this.selectedFile = null;
        fileInput.value = ''; 
        alert('Only video files are allowed');
      }
    }

  }
}
