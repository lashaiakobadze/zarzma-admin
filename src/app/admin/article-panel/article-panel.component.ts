import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';


import { ImageSnippet } from 'src/app/shared/models/image-snippet.model';
import { Article } from '../models/article';
import { ArticleInterface } from '../interfaces/article.interface';
import { ArticleService } from './article.service';

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
  isAdminMode = true;

  eparchyItems: ArticleInterface[] = [];
  publicationsItems: ArticleInterface[] = [];
  iconsItems: ArticleInterface[] = [];

  eparchySub: Subscription;
  publicationsSub: Subscription;
  iconsSub: Subscription;

  constructor(
    public articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.articleService.getEparchyItems().subscribe();
    this.eparchySub = this.articleService.getEparchyItemsListener()
      .subscribe(eparchyItems => {
        this.eparchyItems = eparchyItems;
      })

    this.articleService.getIconsItems().subscribe();
    this.iconsSub = this.articleService.getIconsItemsListener()
      .subscribe(iconsItems => {
        this.iconsItems = iconsItems;
      })

    this.articleService.getPublicationsItems().subscribe();
    this.publicationsSub = this.articleService.getPublicationsItemsListener()
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

    this.articleService.storeArticle(formData as unknown as Article)
      .subscribe((articleData) => {
        // ToDo: არტიკლის რესფონსში გამოშვება მინდა დასააფდეითებლად;
        console.log(articleData);
          this.articleForm.reset();
        }
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
