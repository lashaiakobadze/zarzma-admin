import { Component } from '@angular/core';
import { ImageService } from './image-upload.service';

class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-image-upload',
  templateUrl: 'image-upload.component.html',
  styleUrls: ['image-upload.component.scss']
})
export class ImageUploadComponent {

  selectedFile: ImageSnippet;

  constructor(
    private imageService: ImageService
  ){}

  private onSuccess(): void {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError(): void {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any): void {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
      // this.imageService.uploadImage(this.selectedFile.file).subscribe(
      //   (res) => {
      //     this.onSuccess();
      //   },
      //   (err) => {
      //     this.onError();
      //   });
      console.log(this.selectedFile);
    });

    reader.readAsDataURL(file);
  }
}
