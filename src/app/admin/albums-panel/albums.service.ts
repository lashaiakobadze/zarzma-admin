import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { AlbumInterface } from '../interfaces/album.interface';
import { AlbumItemInterface } from '../interfaces/albumItem.interface';
import { AlbumPhotoInterface } from '../interfaces/albumPhoto.interface';
import { Album } from '../models/album.model';
import { AlbumItem } from '../models/albumItem.model';

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

  // Album
  getAlbums(): Observable<AlbumInterface[]> {
    return this.http.get<{ albums: AlbumInterface[] }>(`Albums/GetAlbums`)
      .pipe(
        this.loaderService.useLoader,
        map((albumsData: { albums: AlbumInterface[] }) => albumsData.albums),
        tap(( albums: AlbumInterface[]) => {
          this.albums = albums;
          this.albumsUpdated.next(this.albums);
        })
      );
  }

  getAlbumsListener(): Observable<AlbumInterface[]> {
    return this.albumsUpdated.asObservable();
  }

  addAlbum(album: Album): Observable<AlbumInterface> {
    return this.http.post<{ newAlbum: AlbumInterface }>(`Albums/AddAlbum`, album)
      .pipe(
        this.loaderService.useLoader,
        map((newAlbumData: { newAlbum: AlbumInterface }) => newAlbumData.newAlbum),
        tap((newAlbum: AlbumInterface) => {
          this.albums = [...this.albums, newAlbum];
          this.albumsUpdated.next([...this.albums]);
        })
      );
  }

  deleteAlbum(id: number): Observable<unknown> {
    return this.http.get(`Albums/DeleteAlbum?ID=${id}`)
      .pipe(
        this.loaderService.useLoader,
        tap(() => {
          const albums = this.albums.filter(item => item.id !== id);
          this.albums = albums;
          this.albumsUpdated.next([...this.albums]);
        })
      );
  }

  // Album Items
  addAlbumItem(albumItem: AlbumItem): Observable<AlbumItemInterface> {
    return this.http.post<{ newAlbumItem: AlbumItemInterface }>(`Albums/AddAlbumItem`, albumItem)
      .pipe(
        this.loaderService.useLoader,
        map((newAlbumData: { newAlbumItem: AlbumItemInterface }) => newAlbumData.newAlbumItem),
        tap((newAlbumItem: AlbumItemInterface) => {
          const albums = this.albums.map((album: AlbumInterface) => {
            if (album.id === newAlbumItem.albumId) {
              album.albumItems = [...album.albumItems, newAlbumItem];
            }

            return album;
          });

          this.albums = albums;
          this.albumsUpdated.next([...this.albums]);
        })
      );
  }

  deleteAlbumItem(id: number): Observable<unknown> {
    return this.http.get(`Albums/DeleteAlbumItem?ID=${id}`)
      .pipe(
        this.loaderService.useLoader,
        tap(() => {
          const albums = this.albums.map((album: AlbumInterface) => {
            album.albumItems = album.albumItems.filter((item: AlbumItemInterface) => item.id !== id);

            return album;
          });

          this.albums = albums;
          this.albumsUpdated.next([...this.albums]);
        })
      );
  }

  // Album Item photos
  addAlbumPhoto(albumPhoto: FormData): Observable<AlbumPhotoInterface> {
    return this.http.post<{ newAlbumPhoto: AlbumPhotoInterface }>(`Albums/AddAlbumPhoto`, albumPhoto)
      .pipe(
        this.loaderService.useLoader,
        map((albumsPhotoData: { newAlbumPhoto: AlbumPhotoInterface }) => albumsPhotoData.newAlbumPhoto),
        tap((newAlbumPhoto: AlbumPhotoInterface) => {
          const albums = this.albums.map((album: AlbumInterface) => {
            album.albumItems = album.albumItems.map((albumItem: AlbumItemInterface) => {
              if (albumItem.id === newAlbumPhoto.albumItemId) {
                albumItem.albumPhotos.push(newAlbumPhoto);
              }
              return albumItem;
            });

            return album;
          });

          this.albums = albums;
          this.albumsUpdated.next([...this.albums]);
        })
      );
  }

  deleteAlbumPhoto(id: number): Observable<unknown> {
    return this.http.get(`Albums/DeleteAlbumPhoto?ID=${id}`)
      .pipe(
        this.loaderService.useLoader,
        tap(() => {
          const albums = this.albums.map((album: AlbumInterface) => {
            album.albumItems = album.albumItems.map((albumItem: AlbumItemInterface) => {
              albumItem.albumPhotos = albumItem.albumPhotos.filter((albumPhot: AlbumPhotoInterface) => albumPhot.id !== id);
              return albumItem;
            });

            return album;
          });

          this.albums = albums;
          this.albumsUpdated.next([...this.albums]);
        })
      );
  }
}
