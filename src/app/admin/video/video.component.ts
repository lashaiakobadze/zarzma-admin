import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { VideoData } from './models/video.interface';
import { Video } from './models/video.model';
import { VideoForm } from './models/videoForm.interface';
import { VideoService } from './video.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  videoItems: VideoData[] = [];
  formMode = false;
  videoForm: FormGroup<VideoForm>;

  constructor(public videoService: VideoService) { }

  ngOnInit(): void {
    this.initForm();
    this.videoService.getVideosItems().subscribe();

    this.videoService.getVideoItemsListener()
      .subscribe(videoItems => {
        this.videoItems = videoItems;
        console.log(this.videoItems);
      })
  }

  onGetVideoForm(): void {
    this.formMode = true;
  }

  onAddVideo(): void {
    const video = new Video(this.videoForm.value.name, this.videoForm.value.videoURL);
    this.videoService.addVideo(video)
    .subscribe(
      () => {
        console.log('Article add successful!');
        this.videoForm.reset();
      }
    );
  }

  onDeleteVideo(id: number): void {
    this.videoService.deleteVideo(id).subscribe();
  }

  initForm(): void {
    this.videoForm = new FormGroup<VideoForm>({
      name: new FormControl(''),
      videoURL: new FormControl(''),
    });
  }

}
