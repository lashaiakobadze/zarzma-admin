import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppValidators } from 'src/app/shared/validators/app-validators';
import { AlbumType } from '../enums/albumType.enum';
import { AlbumInterface } from '../interfaces/album.interface';
import { Album } from '../models/album.model';
import { AlbumItem } from '../models/albumItem.model';
import { AlbumComponent } from './album/album.component';
import { AlbumsService } from './albums.service';

@UntilDestroy()
@Component({
  standalone: true,
  imports: [SharedModule, AlbumComponent],
  selector: 'app-albums-panel',
  templateUrl: './albums-panel.component.html',
  styleUrls: ['./albums-panel.component.scss'],
})
export class AlbumsPanelComponent implements OnInit {
  AlbumTypes: number[];
  formMode = false;
  albumForm: FormGroup;
  albums: AlbumInterface[];

  constructor(
    public albumsService: AlbumsService
  ) { }

  ngOnInit(): void {
    this.AlbumTypes = [AlbumType.album, AlbumType.incense, AlbumType.enamel, AlbumType.calendar];

    this.albumsService.getAlbums();
    this.albumsService.getAlbumsListener()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (albumsData: AlbumInterface[]) => {
          this.albums = albumsData;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () =>  console.log('done'),
      })
  }

  onGetAlbumForm() {
    this.formMode = true;
    this.initForm();
  }

  // Adds
  onAddAlbum() {
    if (this.albumForm.invalid) {
      return;
    }

    const album = new Album(this.albumForm.value.Name, this.albumForm.value.AlbumType);
    console.log(album);

    // this.albumsService.addAlbum(this.albumForm.value);
  }

  onAddAlbumItem(albumItem: AlbumItem) {
    console.log(albumItem);
  }

  onAddAlbumPhoto(albumPhoto: FormData) {
    for (let [key, value] of albumPhoto.entries()) {
      console.log(`${key}: ${value}`);
    }

    console.log(albumPhoto);

    this.albumsService.addAlbumPhoto(albumPhoto);
  }

  // Deletes
  onDeleteAlbum(id: number) {
    console.log(id);
  }

  onDeleteAlbumItem(id: number) {
    console.log(id);
  }

  onDeleteAlbumPhoto(photoId: number) {
    console.log(photoId);
  }

  // forms
  errors(controlName: string | (string | number)[]): any {
    return Object.values(this.get(controlName).errors);
  }

  get(controlName: string | (string | number)[]): AbstractControl {
    return this.albumForm.get(controlName);
  }

  initForm(): void {
    this.albumForm = new FormGroup({
      Name: new FormControl(null, AppValidators.required),
      AlbumType: new FormControl(null, AppValidators.required)
    });
  }

}
