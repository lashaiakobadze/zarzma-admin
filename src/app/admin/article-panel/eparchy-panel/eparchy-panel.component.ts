import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AppValidators } from 'src/app/shared/validators/app-validators';
import { environment } from 'src/environments/environment';
import { DocType } from '../../enums/docType.enum';
import { ArticleInterface } from '../../interfaces/article.interface';
import { ArticleForm } from '../../interfaces/form-Interfaces/articleForm.interface';
import { ArticleService } from '../article.service';

@UntilDestroy()
@Component({
  selector: 'app-eparchy-panel',
  templateUrl: './eparchy-panel.component.html',
  styleUrls: ['./eparchy-panel.component.scss']
})
export class EparchyPanelComponent implements OnInit {
  BASE_URL = environment.dataUrl;

  @Input() eparchyItem: ArticleInterface;
  eparchyForm: FormGroup<ArticleForm>;
  imagePreview: string;

  constructor(
    public articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.initForm(this.eparchyItem);
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.eparchyForm.patchValue({ files: file });
    this.eparchyForm.get('files').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onUpdateEparchy(): void {
    if (!this.eparchyForm.valid) {
      return;
    }

    const formData: FormData = this.articleService.getFormData(this.eparchyForm);

    this.articleService.updateArticle(formData).pipe(untilDestroyed(this)).subscribe();
  }

  onDeleteEparchy(id: number): void {
    if(window.confirm('ნამდვილად გსურთ წაშლა?')){
      this.articleService.deleteArticle(id, DocType.eparchy).pipe(untilDestroyed(this)).subscribe();
    }
  }

  errors(controlName: string | (string | number)[]): any {
    return Object.values(this.get(controlName).errors);
  }

  get(controlName: string | (string | number)[]): AbstractControl {
    return this.eparchyForm.get(controlName);
  }

  initForm(eparchyItem: ArticleInterface): void {
    this.eparchyForm = new FormGroup<ArticleForm>({
      id: new FormControl(eparchyItem?.id, AppValidators.required),
      docType: new FormControl(eparchyItem?.docType, AppValidators.required),
      TitleGeo: new FormControl(eparchyItem?.title, AppValidators.required),
      TextGeo: new FormControl(eparchyItem?.text, AppValidators.required),
      TitleEng: new FormControl(eparchyItem?.titleEng),
      TextEng: new FormControl(eparchyItem?.textEng),
      TitleRus: new FormControl(eparchyItem?.titleRus),
      TextRus: new FormControl(eparchyItem?.textRus),
      files: new FormControl(eparchyItem?.photoUrl, AppValidators.required),
    });
  }

}
