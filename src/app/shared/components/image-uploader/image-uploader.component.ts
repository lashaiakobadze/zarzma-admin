import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../../models/file-handle.interface';

@Component({
  selector: 'image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})

export class ImageUploaderComponent {
  @Input() isSaml: boolean;
  @Input() singleFile: boolean;
  @Input() selectedFile: File;
  @Input() activeColor: string = 'green';
  @Input() baseColor: string = '#ccc';
  @Input() overlayColor: string = 'rgba(255,255,255,0.5)';

  dragging: boolean = false;
  loaded: boolean = false;
  imageLoaded: boolean = false;
  imageSrc: string = '';

  @Output() fileEmitted = new EventEmitter();
  @Output() filesEmitted = new EventEmitter();

  constructor(private sanitizer: DomSanitizer) {}

  handleDragEnter() {
    this.dragging = true;
  }

  handleDragLeave() {
    this.dragging = false;
  }

  handleDrop(event) {
    event.preventDefault();
    this.dragging = false;
    this.handleInputChange(event);
  }

  handleImageLoad() {
    this.imageLoaded = true;
  }

  files: FileHandle[];
  urls: any[] = [];
  multiples: any[] = [];

  handleInputChange(event) {
    if (this.singleFile) {
      let file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];

      let pattern = /image-*/;
      let reader = new FileReader();

      if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
      }

      this.fileEmitted.emit(file);
      this.loaded = false;

      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }


  _handleReaderLoaded(event) {
    let reader = event.target;
    this.imageSrc = reader.result;
    this.loaded = true;
  }

  onSelectFiles(event) {
    let files: FileHandle[] = [];
    const filesData = event.target.files;

    for (let index = 0; index < event.target.files.length; index++) {
      const file = filesData[`${index}`];
      const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
      files.push({ file, url });
    }

    if (files.length) {
      this.filesEmitted.emit(files);
    }
  }

}
