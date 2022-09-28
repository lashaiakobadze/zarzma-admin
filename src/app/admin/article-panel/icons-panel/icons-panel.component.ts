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
  selector: 'app-icons-panel',
  templateUrl: './icons-panel.component.html',
  styleUrls: ['./icons-panel.component.scss']
})
export class IconsPanelComponent implements OnInit {
  BASE_URL = environment.dataUrl;

  @Input() iconsItem: ArticleInterface;
  iconsForm: FormGroup<ArticleForm>;
  selectedFile: ImageSnippet;

  constructor(
    public articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.initForm(this.iconsItem);
  }

  onUpdateIcons(): void {
    if (!this.iconsForm.valid) {
      return;
    }

    const formData: FormData = this.articleService.getFormData(this.iconsForm);
    this.articleService.updateArticle(formData as unknown as ArticleInterface).pipe(untilDestroyed(this)).subscribe();
  }

  onDeleteIcons(id: number): void {
    if(window.confirm('ნამდვილად გსურთ წაშლა?')){
      this.articleService.deleteArticle(id, DocType.publication).pipe(untilDestroyed(this)).subscribe();
    }
  }

  processFile(imageInput: any): void {
    const file: File = imageInput.files[0];
    this.iconsForm.value.files = [file];
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
    return this.iconsForm.get(controlName);
  }

  initForm(iconsItem: ArticleInterface): void {
    this.iconsForm = new FormGroup<ArticleForm>({
      id: new FormControl(iconsItem?.id, AppValidators.required),
      docType: new FormControl(iconsItem?.docType, AppValidators.required),
      TitleGeo: new FormControl(iconsItem?.title, AppValidators.required),
      TextGeo: new FormControl(iconsItem?.text, AppValidators.required),
      TitleEng: new FormControl(iconsItem?.titleEng),
      TextEng: new FormControl(iconsItem?.textEng),
      TitleRus: new FormControl(iconsItem?.titleRus),
      TextRus: new FormControl(iconsItem?.textRus),
      files: new FormControl(iconsItem?.photoUrl, AppValidators.required),
    });
  }

}
