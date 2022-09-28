import { Component, Input, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-album-photo',
  templateUrl: './album-photo.component.html',
  styleUrls: ['./album-photo.component.scss']
})
export class AlbumPhotoComponent implements OnInit {
  @Input() albumPhoto;

  constructor() { }

  ngOnInit(): void {
  }

}
