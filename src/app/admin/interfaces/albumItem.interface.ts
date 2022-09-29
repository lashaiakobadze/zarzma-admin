import { AlbumPhotoInterface } from "./albumPhoto.interface";

export interface AlbumItemInterface {
  id: number,
  albumId: number,
  name: string,
  createDate: string,
  defaultAlbum: number,
  albumPhotos: AlbumPhotoInterface[]
}
