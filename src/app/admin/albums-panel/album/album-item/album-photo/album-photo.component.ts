import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlbumPhotoInterface } from 'src/app/admin/interfaces/albumPhoto.interface';
import { environment } from 'src/environments/environment';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-album-photo',
  templateUrl: './album-photo.component.html',
  styleUrls: ['./album-photo.component.scss']
})
export class AlbumPhotoComponent implements OnInit {
  BASE_URL = environment.dataUrl;

  @Input() albumPhoto: AlbumPhotoInterface;
  @Output() deleteAlbumPhotoClicked = new EventEmitter<number>();

  imgUrl: string;

  constructor() { }

  onDeleteAlbumPhoto() {
    if(window.confirm('ნამდვილად გსურთ ფოტოს წაშლა?')){
      this.deleteAlbumPhotoClicked.emit(this.albumPhoto.id);
    }
  }

  ngOnInit(): void {
    this.imgUrl = `url('${this.BASE_URL + '/' + this.albumPhoto.photoURL}')`;
  }

}
