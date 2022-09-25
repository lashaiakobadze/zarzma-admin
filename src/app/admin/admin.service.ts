import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { LanguageService } from 'src/app/shared/language.service';
import { Article } from './models/article';

import { ChantInterface } from './interfaces/chant.interface';
import { DocType } from './enums/docType';
import { languages } from './enums/language';
import { ArticleInterface } from './interfaces/article.interface';
import { FormGroup } from '@angular/forms';
import { Chant } from './models/chant.model';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AdminService {
  adminPassword = 'zarzma';
  isAdminMode = true;

  eparchyItems: ArticleInterface[] = [];
  private eparchyItemsUpdated = new Subject<ArticleInterface[]>();

  iconsItems: ArticleInterface[] = [];
  private iconsItemsUpdated = new Subject<ArticleInterface[]>();

  publicationsItems: ArticleInterface[] = [];
  private publicationsItemsUpdated = new Subject<ArticleInterface[]>();

  chantsItems: ChantInterface[] = [];
  private chantsItemsUpdated = new Subject<ChantInterface[]>();

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
    private languageService: LanguageService,
    public route: Router
  ) { }


  ///// Refactor services
  getEparchyItems(): void {
    this.http
      .get<ArticleInterface[]>(`/api/articls/ArticleData?docType=${this.query.docType.eparchy}`)
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
      .get<ArticleInterface[]>(`/api/articls/ArticleData?docType=${this.query.docType.icons}`)
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
      .get<ArticleInterface[]>(`/api/articls/ArticleData?docType=${this.query.docType.publication}`)
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
    return this.http.post<Article>('/api/Articls/AddArticle', article)
      .pipe(this.loaderService.useLoader);
  }

  updateArticle(article: ArticleInterface): void {
    this.http.post<ArticleInterface>('/api/Articls/UpdateArticle', article)
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
    this.http.get(`/api/Articls/DeleteArticle?ID=${articleID}`)
      .pipe(this.loaderService.useLoader).subscribe(() => {
        const eparchyItems = this.eparchyItems.filter(item => item.id !== articleID);
        this.eparchyItems = eparchyItems;
        this.eparchyItemsUpdated.next([...this.eparchyItems]);
      });
  }

  // chants
  getChants(): void {
    this.http.get<ChantInterface[]>(`/api/chants/ChantData`)
      .pipe(this.loaderService.useLoader)
      .subscribe(chantsData => {
        this.chantsItems = chantsData;
        this.chantsItemsUpdated.next([...this.chantsItems]);
      })
  }

  getChantsItemsListener() {
    return this.chantsItemsUpdated.asObservable();
  }

  storeChant(chant: Chant): Observable<Chant> {
    return this.http.post<Chant>('/api/chants/AddChant', chant)
      .pipe(this.loaderService.useLoader);
  }

  deleteChant(id: number) {
    this.http.get(`/api/chants/DeleteChant?ID=${id}`)
      .pipe(this.loaderService.useLoader).subscribe(() => {
        const chantsItems = this.chantsItems.filter(item => item.id !== id);
        this.chantsItems = chantsItems;
        this.chantsItemsUpdated.next([...this.chantsItems]);
      })
  }

  /////
  authQuery = {
    "username": "zarzma",
    "password": "zarzma"
  };

  logOut() {
    const isAdminMode = JSON.stringify(localStorage.getItem('isAdminMode'));
    if (isAdminMode) {
      localStorage.removeItem('isAdminMode');
    }

    this.isAdminMode = false;
  }

  ////////////////// auth service

}
