import { FormControl } from "@angular/forms";

export interface VideoForm {
  name: FormControl<string>;
  videoURL: FormControl<string>;
}
