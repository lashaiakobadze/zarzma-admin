import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ImageSnippet } from 'src/app/shared/models/image-snippet.model';
import { environment } from 'src/environments/environment';
import { DocType } from '../../enums/docType';
import { ArticleInterface } from '../../interfaces/article.interface';
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
  iconsForm: FormGroup;
  selectedFile: ImageSnippet;

  constructor(
    public articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.initForm(this.iconsItem);
  }

  onUpdateIcons(): void {
    const formData: FormData = this.articleService.getFormData(this.iconsForm);
    this.articleService.updateArticle(formData as unknown as ArticleInterface).pipe(untilDestroyed(this)).subscribe();
  }

  onDeleteIcons(id: number): void {
    this.articleService.deleteArticle(id, DocType.icons).pipe(untilDestroyed(this)).subscribe();
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

  initForm(iconsItem: ArticleInterface): void {
    this.iconsForm = new FormGroup({
      id: new FormControl(iconsItem?.id),
      docType: new FormControl(iconsItem?.docType),
      TitleGeo: new FormControl(iconsItem?.title),
      TextGeo: new FormControl(iconsItem?.text),
      TitleEng: new FormControl(iconsItem?.titleEng),
      TextEng: new FormControl(iconsItem?.textEng),
      TitleRus: new FormControl(iconsItem?.titleRus),
      TextRus: new FormControl(iconsItem?.textRus),
      files: new FormControl(iconsItem?.photoUrl),
    });
  }

}
