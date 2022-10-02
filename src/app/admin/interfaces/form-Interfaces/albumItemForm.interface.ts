import { FormControl } from "@angular/forms";

export interface AlbumItemForm {
  Name: FormControl<string>;
  AlbumId: FormControl<number>
}
