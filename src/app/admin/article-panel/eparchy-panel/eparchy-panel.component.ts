import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ImageSnippet } from 'src/app/shared/models/image-snippet.model';
import { environment } from 'src/environments/environment';
import { AdminService } from '../../admin.service';
import { ArticleInterface } from '../../interfaces/article.interface';


@Component({
  selector: 'app-eparchy-panel',
  templateUrl: './eparchy-panel.component.html',
  styleUrls: ['./eparchy-panel.component.scss']
})
export class EparchyPanelComponent implements OnInit {
  BASE_URL = environment.dataUrl;

  @Input() eparchyItem;
  eparchyForm: FormGroup;
  selectedFile: ImageSnippet;

  constructor(public adminService: AdminService) { }

  ngOnInit(): void {
    this.initForm(this.eparchyItem);
  }

  onUpdateEparchy(): void {
    const formData: FormData = this.adminService.getFormData(this.eparchyForm);
    this.adminService.updateArticle(formData as unknown as ArticleInterface);
  }

  onDeleteEparchy(id: number): void {
    this.adminService.deleteArticle(id);
  }

  processFile(imageInput: any): void {
    const file: File = imageInput.files[0];
    this.eparchyForm.value.files = [file];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.selectedFile.pending = true;
    });
    reader.readAsDataURL(file);
  }

  initForm(eparchyItem: ArticleInterface): void {
    this.eparchyForm = new FormGroup({
      id: new FormControl(eparchyItem?.id),
      docType: new FormControl(eparchyItem?.docType),
      // id: new FormControl({ value: eparchyItem?.id, disabled: true}),
      // docType: new FormControl({ value: eparchyItem?.docType, disabled: true}),
      TitleGeo: new FormControl(eparchyItem?.title),
      TextGeo: new FormControl(eparchyItem?.text),
      TitleEng: new FormControl(eparchyItem?.titleEng),
      TextEng: new FormControl(eparchyItem?.textEng),
      TitleRus: new FormControl(eparchyItem?.titleRus),
      TextRus: new FormControl(eparchyItem?.textRus),
      files: new FormControl(eparchyItem?.photoUrl),
    });
  }

}
