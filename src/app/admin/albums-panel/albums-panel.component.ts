import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppValidators } from 'src/app/shared/validators/app-validators';
import { AlbumsService } from './albums.service';

@Component({
  standalone: true,
  selector: 'app-albums-panel',
  imports: [SharedModule],
  templateUrl: './albums-panel.component.html',
  styleUrls: ['./albums-panel.component.scss']
})
export class AlbumsPanelComponent implements OnInit {
  formMode = false;
  albumForm: FormGroup;

  constructor(
    public albumsService: AlbumsService
  ) { }

  ngOnInit(): void {
    this.albumsService.getAlbums().subscribe({
      next: (albumsData) => {
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

  }

  errors(controlName: string | (string | number)[]): any {
    return Object.values(this.get(controlName).errors);
  }

  get(controlName: string | (string | number)[]): AbstractControl {
    return this.albumForm.get(controlName);
  }


  initForm(): void {
    this.albumForm = new FormGroup({
      TextGeo: new FormControl(null, AppValidators.required)
    });
  }

}
