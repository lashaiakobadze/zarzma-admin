import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ImageSnippet } from 'src/app/shared/models/image-snippet.model';
import { AppValidators } from 'src/app/shared/validators/app-validators';
import { environment } from 'src/environments/environment';
import { DocType } from '../../enums/docType.enum';
import { ArticleInterface } from '../../interfaces/article.interface';
import { ArticleForm } from '../../interfaces/form-Interfaces/articleForm.interface';
import { ArticleService } from '../article.service';

@UntilDestroy()
@Component({
  selector: 'app-publications-panel',
  templateUrl: './publications-panel.component.html',
  styleUrls: ['./publications-panel.component.scss']
})
export class PublicationsPanelComponent implements OnInit {
  // BASE_URL = environment.dataUrl;

  @Input() publicationItem: ArticleInterface;
  publicationForm: FormGroup<ArticleForm>;
  selectedFile: ImageSnippet;

  constructor(
    public articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.initForm(this.publicationItem);
  }

  onUpdatePublication(): void {
    if (!this.publicationForm.valid) {
      return;
    }

    const formData: FormData = this.articleService.getFormData(this.publicationForm);
    this.articleService.updateArticle(formData as unknown as ArticleInterface).pipe(untilDestroyed(this)).subscribe();
  }

  onDeletePublication(id: number): void {
    if(window.confirm('ნამდვილად გსურთ წაშლა?')){
      this.articleService.deleteArticle(id, DocType.icons).pipe(untilDestroyed(this)).subscribe();
    }
  }

  processFile(imageInput: any): void {
    const file: File = imageInput.files[0];
    this.publicationForm.value.files = [file];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.selectedFile.pending = true;
    });
    reader.readAsDataURL(file);
  }

  errors(controlName: string | (string | number)[]): any {
    return Object.values(this.get(controlName).errors);
  }

  get(controlName: string | (string | number)[]): AbstractControl {
    return this.publicationForm.get(controlName);
  }

  initForm(publicationItem: ArticleInterface): void {
    this.publicationForm = new FormGroup<ArticleForm>({
      id: new FormControl(publicationItem?.id, AppValidators.required),
      docType: new FormControl(publicationItem?.docType, AppValidators.required),
      TitleGeo: new FormControl(publicationItem?.title, AppValidators.required),
      TextGeo: new FormControl(publicationItem?.text, AppValidators.required),
      TitleEng: new FormControl(publicationItem?.titleEng),
      TextEng: new FormControl(publicationItem?.textEng),
      TitleRus: new FormControl(publicationItem?.titleRus),
      TextRus: new FormControl(publicationItem?.textRus),
      files: new FormControl(null, AppValidators.required),
    });
  }

}
