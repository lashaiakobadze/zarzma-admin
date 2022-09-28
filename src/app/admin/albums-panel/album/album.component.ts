import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppValidators } from 'src/app/shared/validators/app-validators';
import { AlbumItemComponent } from './album-item/album-item.component';

@Component({
  standalone: true,
  imports: [CommonModule, SharedModule, AlbumItemComponent],
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  @Input() album: any;
  @Output() deleteAlbumItemClicked = new EventEmitter<number>();

  form: FormGroup;
  formMode = false;
  isOpen: boolean;

  ngOnInit(): void {
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
