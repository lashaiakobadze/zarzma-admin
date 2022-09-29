import { AlbumItemInterface } from "./albumItem.interface";

export interface AlbumInterface {
  id: number,
  name: string,
  albumType: number,
  createDate: string,
  albumItems: AlbumItemInterface[]
}
