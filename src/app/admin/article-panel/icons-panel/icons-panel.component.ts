import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ImageSnippet } from 'src/app/shared/models/image-snippet.model';
import { environment } from 'src/environments/environment';
import { AdminService } from '../../admin.service';
import { ArticleInterface } from '../../interfaces/article.interface';

@Component({
  selector: 'app-icons-panel',
  templateUrl: './icons-panel.component.html',
  styleUrls: ['./icons-panel.component.scss']
})
export class IconsPanelComponent implements OnInit {
  BASE_URL = environment.dataUrl;

  @Input() iconsItem;
  iconsForm: FormGroup;
  selectedFile: ImageSnippet;

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.initForm(this.iconsItem);
  }

  onUpdateIcons(): void {
    const formData: FormData = this.adminService.getFormData(this.iconsForm);
    this.adminService.updateArticle(formData as unknown as ArticleInterface);
  }

  onDeleteIcons(id: number): void {
    this.adminService.deleteArticle(id);
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
