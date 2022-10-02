import { FormControl } from "@angular/forms";

export interface AlbumForm {
  Name: FormControl<string>;
  AlbumType?: FormControl<number>
}
