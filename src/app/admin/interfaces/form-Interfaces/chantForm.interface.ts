import { FormControl } from "@angular/forms";

export interface ChantForm {
  ChantName: FormControl<string>;
  AudioUrl: FormControl<string>;
  files?: FormControl<File[]>
}
