import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

import { ImageSnippet } from 'src/app/shared/models/image-snippet.model';
import { Article } from '../models/article.model';
import { ArticleInterface } from '../interfaces/article.interface';
import { ArticleService } from './article.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ArticleForm } from '../interfaces/form-Interfaces/articleForm.interface';
import { AppValidators } from 'src/app/shared/validators/app-validators';
import { DocTypeName } from '../enums/docTypeName.enum';
import { ErrorMessages } from 'src/app/shared/models/Errors.enume';

@UntilDestroy()
@Component({
  selector: 'app-article-panel',
  templateUrl: './article-panel.component.html',
  styleUrls: ['./article-panel.component.scss']
})
export class ArticlePanelComponent implements OnInit {
  eparchyItems: ArticleInterface[] = [];
  publicationsItems: ArticleInterface[] = [];
  iconsItems: ArticleInterface[] = [];

  articleForm: FormGroup<ArticleForm>;
  DocTypes: string[] = [];
  formMode = false;
  selectedFile: ImageSnippet;
  articlePanelError: ErrorMessages = null;

  constructor(
    public articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.DocTypes = [DocTypeName.eparchy, DocTypeName.publication, DocTypeName.icons];

    this.articleService.getEparchyItems()
      .pipe(untilDestroyed(this))
      .subscribe();
    this.articleService.getEparchyItemsListener()
      .pipe(untilDestroyed(this))
      .subscribe(eparchyItems => {
        this.eparchyItems = eparchyItems;
      });

    this.articleService.getIconsItems()
      .pipe(untilDestroyed(this))
      .subscribe();
    this.articleService.getIconsItemsListener()
      .pipe(untilDestroyed(this))
      .subscribe(iconsItems => {
        this.iconsItems = iconsItems;
      });

    this.articleService.getPublicationsItems()
      .pipe(untilDestroyed(this))
      .subscribe();
    this.articleService.getPublicationsItemsListener()
      .pipe(untilDestroyed(this))
      .subscribe(publicationsItems => {
        this.publicationsItems = publicationsItems;
      });
  }

  onGetArticleForm(): void {
    this.formMode = true;
    this.initForm();
  }

  processFile(imageInput: any): void {
    const file: File = imageInput.files[0];
    this.articleForm.value.files = [file];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.selectedFile.pending = true; // for loader
    });
    reader.readAsDataURL(file);
  }

  onAddArticle(): void {
    if (!this.articleForm.valid) {
      this.articlePanelError = ErrorMessages.articlePanelError;
      return;
    }

    const myForm = document.forms[0];
    const formData = new FormData(myForm);

    this.articleService.storeArticle(formData as unknown as Article)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
          this.articleForm.reset();
          this.selectedFile = null;
          this.articlePanelError = null;
        }
      );
  }

  onUpdateArticleItem(articleItemForm: FormGroup<ArticleForm>) {
    const formData: FormData = this.articleService.getFormData(articleItemForm);

    this.articleService.updateArticle(formData as unknown as Article)
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  onDeleteArticleItem(event: { id: number, documentType: DocTypeName }) {
    this.articleService.deleteArticle(event.id, event.documentType)
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  errors(controlName: string | (string | number)[]): any {
    return Object.values(this.get(controlName).errors);
  }

  get(controlName: string | (string | number)[]): AbstractControl {
    return this.articleForm.get(controlName);
  }


  initForm(): void {
    this.articleForm = new FormGroup<ArticleForm>({
      DocType: new FormControl(null, AppValidators.required),
      TitleGeo: new FormControl(null, AppValidators.required),
      TitleRus: new FormControl(null),
      TitleEng: new FormControl(null),

      TextGeo: new FormControl(null, AppValidators.required),
      TextRus: new FormControl(null),
      TextEng: new FormControl(null),

      files: new FormControl(null, AppValidators.required)
    });
  }
}
