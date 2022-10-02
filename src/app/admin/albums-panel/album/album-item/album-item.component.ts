import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { AlbumItemInterface } from 'src/app/admin/interfaces/albumItem.interface';
import { ErrorMessages } from 'src/app/shared/models/Errors.enume';
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

  form: FormGroup;
  formMode = false;
  isOpen: boolean;
  albumPanelError: ErrorMessages = null;
  imagePreview: string;

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

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ files: file });
    this.form.get('files').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onAddAlbumPhoto() {
    if (this.form.invalid) {
      this.albumPanelError = ErrorMessages.albumPanelError;
      return;
    }

    const myForm = document.forms[0];
    const formData = new FormData(myForm);
    this.addAlbumPhotoClicked.emit(formData);

    this.imagePreview = null;
    this.form.reset();
    this.albumPanelError = null;
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
      Name: new FormControl('photo'),
      AlbumItemId: new FormControl(albumItem.id, AppValidators.required),
      files: new FormControl(null, AppValidators.required),
    });
  }

}
