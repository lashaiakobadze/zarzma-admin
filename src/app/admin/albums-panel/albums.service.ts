import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { AlbumInterface } from '../interfaces/album.interface';
import { Album } from '../models/album.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  albums: AlbumInterface[] = null;
  private albumsUpdated = new Subject<AlbumInterface[]>();

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService
  ) { }

  getAlbums(): void {
    this.http.get<{ albums: AlbumInterface[] }>(`Albums/GetAlbums`)
      .pipe(
        this.loaderService.useLoader,
        tap((albumsData: { albums: AlbumInterface[] }) => {
          this.albums = albumsData.albums;
          this.albumsUpdated.next(this.albums);
        })
      ).subscribe()
  }

  getAlbumsListener(): Observable<AlbumInterface[]> {
    return this.albumsUpdated.asObservable();
  }

  addAlbum(album: Album): void {
    this.http.post(`Albums/AddAlbum`, album)
      .pipe(
        this.loaderService.useLoader,
        tap((albumsData: any) => {
          // this.albums = albumsData.albums;          ;
          // this.albumsUpdated.next(this.albums);
        })
      ).subscribe();
  }

  addAlbumPhoto(albumPhoto: FormData): void {
    this.http.post(`Albums/AddAlbumPhoto`, albumPhoto)
      .pipe(
        this.loaderService.useLoader,
        tap((albumsPhotoData: any) => {
          // this.albums = albumsData.albums;          ;
          // this.albumsUpdated.next(this.albums);
        })
      ).subscribe();
  }
}
