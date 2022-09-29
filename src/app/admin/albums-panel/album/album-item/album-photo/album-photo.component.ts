import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlbumPhotoInterface } from 'src/app/admin/interfaces/albumPhoto.interface';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-album-photo',
  templateUrl: './album-photo.component.html',
  styleUrls: ['./album-photo.component.scss']
})
export class AlbumPhotoComponent implements OnInit {
  @Input() albumPhoto: AlbumPhotoInterface;
  @Output() deleteAlbumPhotoClicked = new EventEmitter<number>();

  imgUrl: string;

  constructor() { }

  onDeleteAlbumPhoto() {
    if(window.confirm('ნამდვილად გსურთ ფოტოს წაშლა?')){
      this.deleteAlbumPhotoClicked.emit(this.albumPhoto.photoId);
    }
  }

  ngOnInit(): void {
    this.imgUrl = `url('${'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png'}')`;
  }

}
