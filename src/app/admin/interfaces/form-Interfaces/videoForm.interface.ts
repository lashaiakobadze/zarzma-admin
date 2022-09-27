import { FormControl } from "@angular/forms";

export interface VideoForm {
  Name: FormControl<string>;
  VideoURL: FormControl<string>;
}
