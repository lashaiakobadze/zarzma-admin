import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
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
  @Input() albumItem: any;
  @Output() deleteAlbumItemClicked = new EventEmitter<number>();

  form: FormGroup;
  formMode = false;
  isOpen: boolean;

  constructor() { }

  ngOnInit(): void {
    this.albumItem.albumPhotos = [1, 1, 1, 1];
  }

  onDeleteAlbumItem(id: number) {
    this.deleteAlbumItemClicked.emit(id);
  }

  open() {
    this.isOpen = !this.isOpen;
  }

  onDelete(id: number) {
    this.deleteAlbumItemClicked.emit(id);
  }

  onGetForm() {
    this.formMode = true;
    this.initForm();
  }

  onAdd() {
    if (this.form.invalid) {
      return;
    }

    // this.albumsService.addAlbum(this.albumForm.value);
  }

  errors(controlName: string | (string | number)[]): any {
    return Object.values(this.get(controlName).errors);
  }

  get(controlName: string | (string | number)[]): AbstractControl {
    return this.form.get(controlName);
  }


  initForm(): void {
    this.form = new FormGroup({
      Name: new FormControl(null, AppValidators.required),
      AlbumType: new FormControl(null, AppValidators.required)
    });
  }

}
