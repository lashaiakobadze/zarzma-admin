import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ErrorMessages } from 'src/app/shared/models/Errors.enume';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppValidators } from 'src/app/shared/validators/app-validators';
import { AlbumType } from '../enums/albumType.enum';
import { AlbumInterface } from '../interfaces/album.interface';
import { AlbumForm } from '../interfaces/form-Interfaces/albumForm.inerface';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumsPanelComponent implements OnInit {
  AlbumTypes: number[];
  formMode = false;
  albumForm: FormGroup<AlbumForm>;
  albums: AlbumInterface[];
  albumPanelError: ErrorMessages = null;

  constructor(
    public albumsService: AlbumsService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.AlbumTypes = [AlbumType.album, AlbumType.incense, AlbumType.enamel, AlbumType.calendar];

    this.albumsService.getAlbums()
      .pipe(untilDestroyed(this))
      .subscribe();
    this.albumsService.getAlbumsListener()
      .pipe(untilDestroyed(this))
      .subscribe((albumsData: AlbumInterface[]) => {
        this.albums = albumsData;

        this.ref.markForCheck();
      })
  }

  onGetAlbumForm(): void {
    this.formMode = true;
    this.initForm();
  }

  // Adds
  onAddAlbum(): void {
    if (this.albumForm.invalid) {
      this.albumPanelError = ErrorMessages.albumPanelError;
      return;
    }

    this.albumPanelError = null;
    const album = new Album(this.albumForm.value.Name, this.albumForm.value.AlbumType);

    this.albumsService.addAlbum(album)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.albumPanelError = null;
        this.formMode = false;
        this.albumForm.reset();

        this.ref.markForCheck();
      })
  }

  onAddAlbumItem(albumItem: AlbumItem): void {
    this.albumsService.addAlbumItem(albumItem)
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  onAddAlbumPhoto(albumPhoto: FormData): void {
    this.albumsService.addAlbumPhoto(albumPhoto)
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  // Deletes
  onDeleteAlbum(id: number): void {
    this.albumsService.deleteAlbum(id).pipe(untilDestroyed(this)).subscribe();
  }

  onDeleteAlbumItem(id: number): void {
    this.albumsService.deleteAlbumItem(id).pipe(untilDestroyed(this)).subscribe();
  }

  onDeleteAlbumPhoto(id: number): void {
    this.albumsService.deleteAlbumPhoto(id).pipe(untilDestroyed(this)).subscribe();
  }

  // forms
  errors(controlName: string | (string | number)[]): any {
    return Object.values(this.get(controlName).errors);
  }

  get(controlName: string | (string | number)[]): AbstractControl {
    return this.albumForm.get(controlName);
  }

  initForm(): void {
    this.albumForm = new FormGroup<AlbumForm>({
      Name: new FormControl(null, AppValidators.required),
      AlbumType: new FormControl(null, AppValidators.required)
    });
  }

}
