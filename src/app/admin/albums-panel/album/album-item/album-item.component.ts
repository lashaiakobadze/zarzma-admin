import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { AlbumItemInterface } from 'src/app/admin/interfaces/albumItem.interface';
import { ErrorService } from 'src/app/shared/error.service';
import { ErrorMessages } from 'src/app/shared/models/Errors.enume';
import { FileHandle } from 'src/app/shared/models/file-handle.interface';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppValidators } from 'src/app/shared/validators/app-validators';
import { AlbumPhotoComponent } from './album-photo/album-photo.component';

@Component({
  standalone: true,
  imports: [SharedModule, AlbumPhotoComponent],
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
  files: FileHandle[] = [];
  dropMode = false;
  isOpen: boolean;
  albumPanelError: ErrorMessages = null;

  constructor(public errorService: ErrorService) { }

  ngOnInit(): void {
  }

  open(): void {
    this.isOpen = !this.isOpen;
  }

  onGetForm(): void {
    this.dropMode = true;
    this.initForm(this.albumItem);
  }

  onDeleteAlbumItem(): void {
    if(window.confirm('ნამდვილად გსურთ ალბომიდან მოვლენის წაშლა?')){
      this.deleteAlbumItemClicked.emit(this.albumItem.id);
    }
  }

  onDeleteAlbumPhoto(photoId: number): void {
    this.deleteAlbumPhotoClicked.emit(photoId);
  }

  filesDropped(files: FileHandle[]): void {
    this.files = files;
  }

  filesProcess(files: FileHandle[]): void {
    this.files = files;
  }

  storeFiles(): void {
    if (this.form.invalid) {
      this.albumPanelError = ErrorMessages.albumPanelError;
      return;
    }

    this.files.forEach((file: FileHandle) => {
      this.form.patchValue({ files: file.file });
      this.form.get('files').updateValueAndValidity();

      const formData = new FormData();
      formData.append("Name", this.form.get('Name').value);
      formData.append("AlbumItemId", this.form.get('AlbumItemId').value);
      formData.append("files", this.form.get('files').value);

      this.addAlbumPhotoClicked.emit(formData);
    });

    this.workEnd();
  }

  workEnd(): void {
    this.form.reset();
    this.dropMode = false;
    this.files = [];
    this.albumPanelError = null;
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
      files: new FormControl(null),
    });
  }
}
