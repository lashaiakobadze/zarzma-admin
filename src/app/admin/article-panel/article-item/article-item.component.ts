import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AppValidators } from 'src/app/shared/validators/app-validators';
import { environment } from 'src/environments/environment';
import { DocTypeName } from '../../enums/docTypeName.enum';
import { ArticleInterface } from '../../interfaces/article.interface';
import { ArticleForm } from '../../interfaces/form-Interfaces/articleForm.interface';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss']
})
export class ArticleItemComponent implements OnInit {
  BASE_URL = environment.dataUrl;

  @Input() articleItem: ArticleInterface;
  @Output() updateArticleItemClicked = new EventEmitter<FormGroup<ArticleForm>>();
  @Output() deleteArticleItemClicked = new EventEmitter<{ id: number, documentType: DocTypeName}>();

  articleItemForm: FormGroup<ArticleForm>;
  imagePreview: string;
  document_type: DocTypeName;

  constructor() { }

  ngOnInit(): void {
    this.initForm(this.articleItem);

    switch(this.articleItem?.docType) {
      case DocTypeName.eparchy: {
        this.document_type = DocTypeName.eparchy;
        break;
      }
      case DocTypeName.icons: {
        this.document_type = DocTypeName.icons;
        break;
      }
      case DocTypeName.publication: {
        this.document_type = DocTypeName.publication;
        break;
      }
      default: this.document_type = DocTypeName.all;
    }
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.articleItemForm.patchValue({ files: file });
    this.articleItemForm.get('files').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onUpdateArticleItem(): void {
    if (!this.articleItemForm.valid) {
      return;
    }

    this.updateArticleItemClicked.emit(this.articleItemForm);
  }

  onDeleteArticleItem(id: number): void {
    if(window.confirm('ნამდვილად გსურთ წაშლა?')){
      this.deleteArticleItemClicked.emit({id: id, documentType: this.document_type});
    }
  }

  errors(controlName: string | (string | number)[]): any {
    return Object.values(this.get(controlName).errors);
  }

  get(controlName: string | (string | number)[]): AbstractControl {
    return this.articleItemForm.get(controlName);
  }

  initForm(articleItem: ArticleInterface): void {
    this.articleItemForm = new FormGroup<ArticleForm>({
      id: new FormControl(articleItem?.id, AppValidators.required),
      docType: new FormControl(articleItem?.docType, AppValidators.required),
      TitleGeo: new FormControl(articleItem?.title, AppValidators.required),
      TextGeo: new FormControl(articleItem?.text, AppValidators.required),
      TitleEng: new FormControl(articleItem?.titleEng),
      TextEng: new FormControl(articleItem?.textEng),
      TitleRus: new FormControl(articleItem?.titleRus),
      TextRus: new FormControl(articleItem?.textRus),
      files: new FormControl(articleItem?.photoUrl, AppValidators.required),
    });
  }

}
