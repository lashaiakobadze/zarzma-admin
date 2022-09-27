import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AlbumItemComponent } from './album-item/album-item.component';

@Component({
  standalone: true,
  imports: [CommonModule, AlbumItemComponent],
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  @Input() album: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.album);
  }

}
