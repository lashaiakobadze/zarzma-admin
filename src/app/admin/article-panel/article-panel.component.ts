import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';


import { ImageSnippet } from 'src/app/shared/models/image-snippet.model';
import { Article } from '../models/article';
import { ArticleInterface } from '../interfaces/article.interface';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-article-panel',
  templateUrl: './article-panel.component.html',
  styleUrls: ['./article-panel.component.scss']
})
export class ArticlePanelComponent implements OnInit, OnDestroy {
  DocTypes = ['ეპარქია', 'გამოცემები', 'ხატები'];
  articleForm: FormGroup;
  formMode = false;
  selectedFile: ImageSnippet;

  eparchyItems: ArticleInterface[] = [];
  publicationsItems: ArticleInterface[] = [];
  iconsItems: ArticleInterface[] = [];

  eparchySub: Subscription;
  publicationsSub: Subscription;
  iconsSub: Subscription;

  constructor(
    public adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.adminService.getEparchyItems();
    this.eparchySub = this.adminService.getEparchyItemsListener()
      .subscribe(eparchyItems => {
        this.eparchyItems = eparchyItems;
      })

    this.adminService.getIconsItems();
    this.iconsSub = this.adminService.getIconsItemsListener()
      .subscribe(iconsItems => {
        this.iconsItems = iconsItems;
      })

    this.adminService.getPublicationsItems();
    this.publicationsSub = this.adminService.getPublicationsItemsListener()
      .subscribe(publicationsItems => {
        this.publicationsItems = publicationsItems;
      })

      console.log(this.articleForm);
  }

  onGetArticleForm(): void {
    this.formMode = true;
  }

  processFile(imageInput: any): void {
    const file: File = imageInput.files[0];
    this.articleForm.value.files = [file];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.selectedFile.pending = true;
    });
    reader.readAsDataURL(file);
  }

  onAddArticle(): void {
    const myForm = document.forms[0];
    const formData = new FormData(myForm);

    this.adminService.storeArticle(formData as unknown as Article)
      .subscribe(() => {
          console.log('Article add successful!');
          this.articleForm.reset();
        }, err => console.log('HTTP Error', err.error)
      );
  }


  initForm(): void {
    this.articleForm = new FormGroup({
      DocType: new FormControl(''),
      TitleGeo: new FormControl(''),
      TitleRus: new FormControl(''),
      TitleEng: new FormControl(''),

      TextGeo: new FormControl(''),
      TextRus: new FormControl(''),
      TextEng: new FormControl(''),

      files: new FormControl('')
    });
  }

  ngOnDestroy(): void {
    this.eparchySub?.unsubscribe();
    this.iconsSub?.unsubscribe();
    this.publicationsSub?.unsubscribe();
  }

}
