import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { VideoData } from '../interfaces/video.interface';
import { Video } from '../models/video.model';

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

  getVideosItems(): Observable<VideoData[]> {
    return this.http
      .get<VideoData[]>(`Videos/VideoData`)
        .pipe(
          this.loaderService.useLoader,
          tap((videoData: VideoData[]) => {
            this.videoItems = videoData;
            this.videoItemsUpdated.next([...this.videoItems]);
          })
        );
  }

  getVideoItemsListener(): Observable<VideoData[]> {
    return this.videoItemsUpdated.asObservable();
  }

  addVideo(video: Video): Observable<VideoData> {
    return this.http.post<{ newVideo: VideoData }>('Videos/AddVideo', video)
      .pipe(
        this.loaderService.useLoader,
        map((newVideoData: { newVideo: VideoData }) => newVideoData.newVideo),
        tap((newVideo: VideoData) => {
          this.videoItems = [...this.videoItems, newVideo];
          this.videoItemsUpdated.next([...this.videoItems]);
        })
      );
  }

  deleteVideo(id: number): Observable<unknown> {
    return this.http.get(`Videos/DeleteVideo?ID=${id}`)
      .pipe(
        this.loaderService.useLoader,
        tap(() => {
          const videoItems = this.videoItems.filter(item => item.id !== id);
          this.videoItems = videoItems;
          this.videoItemsUpdated.next([...this.videoItems]);
        })
      );
  }
}
