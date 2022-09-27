import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  albums: any[] = null;
  private albumsUpdated = new Subject<any[]>();

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService
  ) { }

  getAlbums(): void {
    this.http.get(`Albums/GetAlbums`)
      .pipe(
        this.loaderService.useLoader,
        tap((albumsData: any) => {
          this.albums = albumsData.albums;          ;
          this.albumsUpdated.next(this.albums);
        })
      ).subscribe()
  }

  getAlbumsListener(): Observable<any[]> {
    return this.albumsUpdated.asObservable();
  }

  addAlbum(album: any): void {
    this.http.post(`Albums/AddAlbum`, album)
      .pipe(
        this.loaderService.useLoader,
        tap((albumsData: any) => {
          // this.albums = albumsData.albums;          ;
          // this.albumsUpdated.next(this.albums);
        })
      ).subscribe();
  }
}
