import { FormControl } from "@angular/forms";
import { DocType } from "../../enums/docType.enum";

export interface ArticleForm {
  id?: FormControl<number>,
  docType?: FormControl<DocType>;
  DocType?: FormControl<DocType>;

  TitleGeo: FormControl<string>;
  TitleRus: FormControl<string>;
  TitleEng: FormControl<string>;

  TextGeo: FormControl<string>;
  TextRus: FormControl<string>;
  TextEng: FormControl<string>;

  files: FormControl<File[]> | FormControl<string>
}
