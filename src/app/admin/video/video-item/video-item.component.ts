import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VideoData } from '../models/video.interface';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss']
})
export class VideoItemComponent implements OnInit {
  @Input() video: VideoData;
  @Output() deleteVideoClicked = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteVideo(id: number) {
    this.deleteVideoClicked.emit(id);
  }

}