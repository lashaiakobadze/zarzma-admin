import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { VideoData } from '../interfaces/video.interface';
import { Video } from '../models/video.model';
import { VideoForm } from '../interfaces/form-Interfaces/videoForm.interface';
import { VideoService } from './video.service';
import { AppValidators } from 'src/app/shared/validators/app-validators';
import { ErrorMessages } from 'src/app/shared/models/Errors.enume';

@UntilDestroy()
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  videoItems: VideoData[] = [];
  formMode = false;
  videoForm: FormGroup<VideoForm>;
  videoPanelError: ErrorMessages = null;

  constructor(public videoService: VideoService) { }

  ngOnInit(): void {
    this.initForm();
    this.videoService.getVideosItems().pipe(untilDestroyed(this)).subscribe();

    this.videoService.getVideoItemsListener()
      .pipe(untilDestroyed(this))
      .subscribe(videoItems => {
        this.videoItems = videoItems;
      })
  }

  onGetVideoForm(): void {
    this.formMode = true;
  }

  onAddVideo(): void {
    if (!this.videoForm.valid) {
      this.videoPanelError = ErrorMessages.videoPanelError;
      return;
    }

    this.videoPanelError = null;
    const video = new Video(this.videoForm.value.Name, this.videoForm.value.VideoURL);

    this.videoService.addVideo(video)
    .pipe(untilDestroyed(this))
    .subscribe(
      () => {
        this.videoPanelError = null;
        console.log('Article add successful!');
        this.videoForm.reset();
      }
    );
  }

  onDeleteVideo(id: number): void {
    if(window.confirm('ნამდვილად გსურთ წაშლა?')){
      this.videoService.deleteVideo(id).pipe(untilDestroyed(this)).subscribe();
    }
  }

  errors(controlName: string | (string | number)[]): any {
    return Object.values(this.get(controlName).errors);
  }

  get(controlName: string | (string | number)[]): AbstractControl {
    return this.videoForm.get(controlName);
  }

  initForm(): void {
    this.videoForm = new FormGroup<VideoForm>({
      Name: new FormControl(null, AppValidators.required),
      VideoURL: new FormControl(null, AppValidators.required),
    });
  }

}
