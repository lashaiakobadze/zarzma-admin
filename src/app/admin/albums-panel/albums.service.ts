import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  albums: any = null;
  private albumsUpdated = new Subject();

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService
  ) { }

  getAlbums(): Observable<any> {
    return this.http.get(`Albums/GetAlbums`)
      .pipe(
        this.loaderService.useLoader,
        tap((albumsData: any) => {
          this.albums = albumsData;
          this.albumsUpdated.next(this.albums);
        })
      );
  }
}
