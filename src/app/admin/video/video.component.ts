import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { VideoService } from './video.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  videoItems: any = [];
  isAdminMode = true;
  constructor(public videoService: VideoService) { }

  ngOnInit(): void {
    this.initForm();
    this.videoService.getVideosItems();

    this.videoService.getVideoItemsListener()
      .subscribe(videoItems => {
        this.videoItems = videoItems;
        console.log(this.videoItems);
      })
  }

  formMode = false;
  videoForm: FormGroup;

  onGetVideoForm(): void {
    this.formMode = true;
  }

  onAddVideo(): void {
  }

  initForm(): void {
    this.videoForm = new FormGroup({
      name: new FormControl(''),
      videoURL: new FormControl(''),
    });
  }

}
