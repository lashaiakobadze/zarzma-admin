import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  videoItems: any = [];
  private videoItemsUpdated = new Subject();

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
  ) { }

  getVideosItems(): void {
    this.http
      .get(`/api/Videos/VideoData`)
        .pipe(this.loaderService.useLoader)
        .subscribe(videoData => {
          this.videoItems = videoData;
          this.videoItemsUpdated.next([...this.videoItems]);
        })
  }

  getVideoItemsListener() {
    return this.videoItemsUpdated.asObservable();
  }
}
