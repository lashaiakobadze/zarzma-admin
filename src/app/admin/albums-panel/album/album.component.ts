import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ErrorMessages } from 'src/app/shared/models/Errors.enume';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppValidators } from 'src/app/shared/validators/app-validators';
import { AlbumInterface } from '../../interfaces/album.interface';
import { AlbumItem } from '../../models/albumItem.model';
import { AlbumItemComponent } from './album-item/album-item.component';

@Component({
  standalone: true,
  imports: [CommonModule, SharedModule, AlbumItemComponent],
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  @Input() album: AlbumInterface;

  @Output() addAlbumItemClicked = new EventEmitter<AlbumItem>();
  @Output() addAlbumPhotoClicked = new EventEmitter<FormData>();

  @Output() deleteAlbumClicked = new EventEmitter<number>();
  @Output() deleteAlbumItemClicked = new EventEmitter<number>();
  @Output() deleteAlbumPhotoClicked = new EventEmitter<number>();

  form: FormGroup;
  formMode = false;
  isOpen: boolean;
  albumPanelError: ErrorMessages = null;

  ngOnInit(): void {
  }

  open() {
    this.isOpen = !this.isOpen;
  }

  onGetForm() {
    this.formMode = true;
    this.initForm(this.album);
  }

  // Adds
  onAddAlbumItem() {
    if (this.form.invalid) {
      this.albumPanelError = ErrorMessages.albumPanelError;
      return;
    }

    this.albumPanelError = null;

    const albumItem = new AlbumItem(this.form.value.Name, this.form.value.AlbumId);
    this.addAlbumItemClicked.emit(albumItem);
  }

  onAddAlbumPhoto(albumPhoto: FormData) {
    this.addAlbumPhotoClicked.emit(albumPhoto);
  }

  // deletes
  onDeleteAlbum() {
    if(window.confirm('ნამდვილად გსურთ ალბომის წაშლა?')){
      this.deleteAlbumClicked.emit(this.album.id);
    }
  }

  onDeleteAlbumItem(id: number) {
    this.deleteAlbumItemClicked.emit(id);
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


  initForm(album: AlbumInterface): void {
    this.form = new FormGroup({
      Name: new FormControl(null, AppValidators.required),
      AlbumId: new FormControl(album.id, AppValidators.required)
    });
  }

}
