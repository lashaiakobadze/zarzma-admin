import { Component, Input, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-album-item',
  templateUrl: './album-item.component.html',
  styleUrls: ['./album-item.component.scss']
})
export class AlbumItemComponent implements OnInit {
  @Input() albumItem: any;

  constructor() { }

  ngOnInit(): void {
  }

}
