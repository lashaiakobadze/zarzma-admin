import { FormControl } from "@angular/forms";
import { DocType } from "../../enums/docType.enum";
import { DocTypeName } from "../../enums/docTypeName.enum";

export interface ArticleForm {
  id?: FormControl<number>,
  docType?: FormControl<string>;
  DocType?: FormControl<DocType | DocTypeName>;

  TitleGeo: FormControl<string>;
  TitleRus: FormControl<string>;
  TitleEng: FormControl<string>;

  TextGeo: FormControl<string>;
  TextRus: FormControl<string>;
  TextEng: FormControl<string>;

  files: FormControl<File[]> | FormControl<string> | FormControl<File>
}
