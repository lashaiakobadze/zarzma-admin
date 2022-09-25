import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ImageSnippet } from 'src/app/shared/models/image-snippet.model';
import { environment } from 'src/environments/environment';
import { AdminService } from '../../admin.service';
import { ArticleInterface } from '../../interfaces/article.interface';

@Component({
  selector: 'app-publications-panel',
  templateUrl: './publications-panel.component.html',
  styleUrls: ['./publications-panel.component.scss']
})
export class PublicationsPanelComponent implements OnInit {
  BASE_URL = environment.dataUrl;

  @Input() publicationItem;
  publicationForm: FormGroup;
  selectedFile: ImageSnippet;

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.initForm(this.publicationItem);
  }

  onUpdatePublication(): void {
    const formData: FormData = this.adminService.getFormData(this.publicationForm);
    this.adminService.updateArticle(formData as unknown as ArticleInterface);
  }

  onDeletePublication(id: number): void {
    this.adminService.deleteArticle(id);
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

  initForm(publicationItem: ArticleInterface): void {
    this.publicationForm = new FormGroup({
      id: new FormControl(publicationItem?.id),
      docType: new FormControl(publicationItem?.docType),
      TitleGeo: new FormControl(publicationItem?.title),
      TextGeo: new FormControl(publicationItem?.text),
      TitleEng: new FormControl(publicationItem?.titleEng),
      TextEng: new FormControl(publicationItem?.textEng),
      TitleRus: new FormControl(publicationItem?.titleRus),
      TextRus: new FormControl(publicationItem?.textRus),
      files: new FormControl(publicationItem?.photoUrl),
    });
  }

}
