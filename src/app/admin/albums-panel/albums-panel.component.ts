import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppValidators } from 'src/app/shared/validators/app-validators';
import { AlbumType } from '../enums/albumType.enum';
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
  albums: any[];

  constructor(
    public albumsService: AlbumsService
  ) { }

  ngOnInit(): void {
    this.AlbumTypes = [AlbumType.albumType1, AlbumType.albumType2];

    this.albumsService.getAlbums();
    this.albumsService.getAlbumsListener()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (albumsData) => {
          this.albums = albumsData;
          console.log('albumsData', albumsData);
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

  onAddAlbum() {
    if (this.albumForm.invalid) {
      return;
    }

    this.albumsService.addAlbum(this.albumForm.value);
  }

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
