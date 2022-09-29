import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { AlbumItemInterface } from 'src/app/admin/interfaces/albumItem.interface';
import { ImageSnippet } from 'src/app/shared/models/image-snippet.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppValidators } from 'src/app/shared/validators/app-validators';
import { AlbumPhotoComponent } from './album-photo/album-photo.component';

@Component({
  standalone: true,
  imports: [CommonModule, SharedModule, AlbumPhotoComponent],
  selector: 'app-album-item',
  templateUrl: './album-item.component.html',
  styleUrls: ['./album-item.component.scss']
})
export class AlbumItemComponent implements OnInit {
  @Input() albumItem: AlbumItemInterface;

  @Output() addAlbumPhotoClicked = new EventEmitter<FormData>();

  @Output() deleteAlbumItemClicked = new EventEmitter<number>();
  @Output() deleteAlbumPhotoClicked = new EventEmitter<number>();

  selectedFile: ImageSnippet;
  form: FormGroup;
  formMode = false;
  isOpen: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  open() {
    this.isOpen = !this.isOpen;
  }

  onGetForm() {
    this.formMode = true;
    this.initForm(this.albumItem);
  }

  processFile(imageInput: any): void {
    const file: File = imageInput.files[0];
    this.form.value.files = [file];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });
    reader.readAsDataURL(file);
  }

  onAddAlbumPhoto() {
    if (this.form.invalid) {
      return;
    }

    const myForm = document.forms[0];
    const formData = new FormData(myForm);

    this.addAlbumPhotoClicked.emit(formData);
  }

  onDeleteAlbumItem() {
    if(window.confirm('ნამდვილად გსურთ ალბომიდან მოვლენის წაშლა?')){
      this.deleteAlbumItemClicked.emit(this.albumItem.id);
    }
  }

  onDeleteAlbumPhoto(photoId: number) {
    this.deleteAlbumPhotoClicked.emit(photoId);
  }

  errors(controlName: string | (string | number)[]): any {
    return Object.values(this.get(controlName).errors);
  }

  get(controlName: string | (string | number)[]): AbstractControl {
    return this.form.get(controlName);
  }


  initForm(albumItem: AlbumItemInterface): void {
    this.form = new FormGroup({
      Name: new FormControl(null, AppValidators.required),
      AlbumItemId: new FormControl(albumItem.albumId, AppValidators.required),
      files: new FormControl(null, AppValidators.required),
    });
  }

}
