import { DocType } from '../enums/docType';

export class Article {
  constructor(
    public DocType: DocType,

    public TitleGeo: string,
    public TitleRus: string,
    public TitleEng: string,

    public TextGeo: string,
    public TextRus: string,
    public TextEng: string,

    public files: File[]
  ) {}
}

