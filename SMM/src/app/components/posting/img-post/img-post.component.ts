import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img-post',
  templateUrl: './img-post.component.html',
  styleUrls: ['./img-post.component.css'],
})
export class ImgPostComponent {
  @Output() imgChange: EventEmitter<string | File> = new EventEmitter<string | File>();
  imgUrl: string = '';
  selectedFile: File | null = null;

  onUrlChange(): void {
    if (this.imgUrl.trim() === '') {
      console.log("Empty link");
      return;
    }

    const imgurlRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|png|svg))/i;
    if (imgurlRegex.test(this.imgUrl)) {
      this.imgChange.emit(this.imgUrl);
      console.log("URL Valid: " + this.imgUrl);
    } else {
      console.log("Not a valid URL");
    }
  }

  onFileSelected(event: any, fileInput: HTMLInputElement): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const selectedFileType = files[0].type;
      if (selectedFileType.startsWith('image/')) {
        this.selectedFile = files[0];
        this.imgChange.emit(this.selectedFile);
        console.log("File selected:", this.selectedFile);
      } else {
        this.selectedFile = null;
        fileInput.value = ''; 
        alert('Only images are allowed');
      }
    }
  }
  
}
