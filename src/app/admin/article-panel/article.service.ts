import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { DocType } from '../enums/docType';
import { languages } from '../enums/language';
import { ArticleInterface } from '../interfaces/article.interface';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  eparchyItems: ArticleInterface[] = [];
  private eparchyItemsUpdated = new Subject<ArticleInterface[]>();

  iconsItems: ArticleInterface[] = [];
  private iconsItemsUpdated = new Subject<ArticleInterface[]>();

  publicationsItems: ArticleInterface[] = [];
  private publicationsItemsUpdated = new Subject<ArticleInterface[]>();

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
    public route: Router
  ) { }

  getEparchyItems(): void {
    this.http
      .get<ArticleInterface[]>(`articls/ArticleData?docType=${this.query.docType.eparchy}`)
        .pipe(this.loaderService.useLoader)
        .subscribe(eparchyData => {
          this.eparchyItems = eparchyData;
          this.eparchyItemsUpdated.next([...this.eparchyItems]);
        })
  }

  getEparchyItemsListener() {
    return this.eparchyItemsUpdated.asObservable();
  }


  getIconsItems(): void {
    this.http
      .get<ArticleInterface[]>(`articls/ArticleData?docType=${this.query.docType.icons}`)
        .pipe(this.loaderService.useLoader)
        .subscribe(iconsData => {
          this.iconsItems = iconsData;
          this.iconsItemsUpdated.next([...this.iconsItems]);
        })
  }


  getIconsItemsListener() {
    return this.iconsItemsUpdated.asObservable();
  }


  getPublicationsItems(): void {
    this.http
      .get<ArticleInterface[]>(`articls/ArticleData?docType=${this.query.docType.publication}`)
        .pipe(this.loaderService.useLoader)
        .subscribe(publicationData => {
          this.publicationsItems = publicationData;
          this.publicationsItemsUpdated.next([...this.publicationsItems]);
        })
  }

  getPublicationsItemsListener() {
    return this.publicationsItemsUpdated.asObservable();
  }

  getFormData(articleForm: FormGroup) {
    const formData = new FormData();
    formData.append("ID", articleForm.get('id').value);
    formData.append("DocType", articleForm.get('docType').value);
    formData.append("TitleGeo", articleForm.get('TitleGeo').value);
    formData.append("TextGeo", articleForm.get('TextGeo').value);
    formData.append("TitleEng", articleForm.get('TitleEng').value);
    formData.append("TextEng", articleForm.get('TextEng').value);
    formData.append("TitleRus", articleForm.get('TitleRus').value);
    formData.append("TextRus", articleForm.get('TextRus').value);
    formData.append("files", articleForm.get('files').value);

    return formData;
  }

  query = {
    docType: DocType,
    docLang: languages
  };

  storeArticle(article: Article): Observable<Article> {
    return this.http.post<Article>('Articls/AddArticle', article)
      .pipe(this.loaderService.useLoader);
  }

  updateArticle(article: ArticleInterface): void {
    this.http.post<ArticleInterface>('Articls/UpdateArticle', article)
      .pipe(this.loaderService.useLoader).subscribe(() => {
          const updatedEparchyItems = [...this.eparchyItems];
          const oldPostIndex = updatedEparchyItems.findIndex(p => p.id === article.id);
          updatedEparchyItems[oldPostIndex] = article;
          this.eparchyItems = updatedEparchyItems;
          this.eparchyItemsUpdated.next([...this.eparchyItems]);
        },
        err => console.log(err)
      );
  }

  deleteArticle(articleID: number) {
    this.http.get(`Articls/DeleteArticle?ID=${articleID}`)
      .pipe(this.loaderService.useLoader).subscribe(() => {
        const eparchyItems = this.eparchyItems.filter(item => item.id !== articleID);
        this.eparchyItems = eparchyItems;
        this.eparchyItemsUpdated.next([...this.eparchyItems]);
      });
  }

}
