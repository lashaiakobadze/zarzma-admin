import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { VideoData } from './models/video.interface';
import { Video } from './models/video.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  videoItems: VideoData[] = [];
  private videoItemsUpdated = new Subject<VideoData[]>();

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
  ) { }

  getVideosItems(): void {
    this.http
      .get<VideoData[]>(`Videos/VideoData`)
        .pipe(this.loaderService.useLoader)
        .subscribe(videoData => {
          this.videoItems = videoData;
          this.videoItemsUpdated.next([...this.videoItems]);
        })
  }

  getVideoItemsListener() {
    return this.videoItemsUpdated.asObservable();
  }

  // ToDo:
  addVideo(video: Video): Observable<Video> {
    console.log(video);
    return this.http.post<Video>('Videos/AddVideo', video)
      .pipe(this.loaderService.useLoader);
  }

  deleteVideo(id: number) {
    this.http.get(`Videos/DeleteVideo?ID=${id}`)
      .pipe(this.loaderService.useLoader).subscribe(() => {
        const videoItems = this.videoItems.filter(item => item.id !== id);
        this.videoItems = videoItems;
        this.videoItemsUpdated.next([...this.videoItems]);
      })
  }
}
