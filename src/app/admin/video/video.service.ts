import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
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
          tap((videoData: VideoData[]) => {
            this.loaderService.useLoader;
            this.videoItems = videoData;
            this.videoItemsUpdated.next([...this.videoItems]);
          })
        );
  }

  getVideoItemsListener(): Observable<VideoData[]> {
    return this.videoItemsUpdated.asObservable();
  }

  // ToDo: აქაც მინდა რესფონსში ობიექტის გამოგზავნა, ასევე არ მუშაობს;
  addVideo(video: Video): Observable<Video> {
    return this.http.post<Video>('Videos/AddVideo', video)
      .pipe(
        tap(() => {
          this.loaderService.useLoader;
          const videoData: Video = video as unknown as Video;

          this.videoItems = [...this.videoItems, videoData];
          this.videoItemsUpdated.next([...this.videoItems]);
        })
      );
  }

  deleteVideo(id: number): Observable<any> {
    return this.http.get(`Videos/DeleteVideo?ID=${id}`)
      .pipe(
        tap(() => {
          this.loaderService.useLoader;

          const videoItems = this.videoItems.filter(item => item.id !== id);
          this.videoItems = videoItems;
          this.videoItemsUpdated.next([...this.videoItems]);
        })
      );
  }
}
