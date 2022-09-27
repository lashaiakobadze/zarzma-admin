import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, Observable, tap } from 'rxjs';
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
    private loaderService: LoaderService
  ) { }

  getEparchyItems(): Observable<ArticleInterface[]> {
    return this.http
      .get<ArticleInterface[]>(`articls/ArticleData?docType=${this.query.docType.eparchy}`)
        .pipe(
          this.loaderService.useLoader,
          tap((eparchyData: ArticleInterface[]) => {
            this.eparchyItems = eparchyData;
            this.eparchyItemsUpdated.next([...this.eparchyItems]);
          })
        );
  }

  getEparchyItemsListener(): Observable<ArticleInterface[]> {
    return this.eparchyItemsUpdated.asObservable();
  }


  getIconsItems(): Observable<ArticleInterface[]> {
    return this.http
      .get<ArticleInterface[]>(`articls/ArticleData?docType=${this.query.docType.icons}`)
        .pipe(
          this.loaderService.useLoader,
          tap((iconsData: ArticleInterface[]) => {
            this.iconsItems = iconsData;
            this.iconsItemsUpdated.next([...this.iconsItems]);
          })
        );
  }


  getIconsItemsListener(): Observable<ArticleInterface[]> {
    return this.iconsItemsUpdated.asObservable();
  }


  getPublicationsItems(): Observable<ArticleInterface[]> {
    return this.http
      .get<ArticleInterface[]>(`articls/ArticleData?docType=${this.query.docType.publication}`)
        .pipe(
          this.loaderService.useLoader,
          tap((publicationData) => {
            this.publicationsItems = publicationData;
            this.publicationsItemsUpdated.next([...this.publicationsItems]);
          })
        );
  }

  getPublicationsItemsListener(): Observable<ArticleInterface[]> {
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
      .pipe(
        this.loaderService.useLoader,
        tap(() => {
          const articleData: ArticleInterface = article as unknown as ArticleInterface;

          switch (article.DocType) {
            case DocType.eparchy: {
              this.eparchyItems = [...this.eparchyItems, articleData];
              this.eparchyItemsUpdated.next([...this.eparchyItems]);
              break;
            }
            case DocType.publication: {
              this.publicationsItems = [...this.eparchyItems, articleData];
              this.publicationsItemsUpdated.next([...this.publicationsItems]);
              break;
            }
            case DocType.icons: {
              this.iconsItems = [...this.eparchyItems, articleData];
              this.iconsItemsUpdated.next([...this.iconsItems]);
              break;
            }
            default: {
              break;
            }
          };
        })
      );
  }

  updateArticle(article: ArticleInterface): Observable<ArticleInterface> {
    return this.http.post<ArticleInterface>('Articls/UpdateArticle', article)
      .pipe(
        this.loaderService.useLoader,
        tap(() => {
          switch (+article.docType) {
            case DocType.eparchy: {
              const updatedEparchyItems = [...this.eparchyItems];
              const oldPostIndex = updatedEparchyItems.findIndex(item => item.id === article.id);
              updatedEparchyItems[oldPostIndex] = article;
              this.eparchyItems = updatedEparchyItems;
              this.eparchyItemsUpdated.next([...this.eparchyItems]);
              break;
            }
            case DocType.publication: {
              const updatedPublicationItems = [...this.eparchyItems];
              const oldPostIndex = updatedPublicationItems.findIndex(item => item.id === article.id);
              updatedPublicationItems[oldPostIndex] = article;
              this.publicationsItems = updatedPublicationItems;
              this.publicationsItemsUpdated.next([...this.eparchyItems]);
              break;
            }
            case DocType.icons: {
              const updatedIconsItems = [...this.eparchyItems];
              const oldPostIndex = updatedIconsItems.findIndex(item => item.id === article.id);
              updatedIconsItems[oldPostIndex] = article;
              this.iconsItems = updatedIconsItems;
              this.iconsItemsUpdated.next([...this.eparchyItems]);
              break;
            }
            default: {
              break;
            }
          };
        })
      );
  }

  // ToDo: არ იშლeბა icone-ბი
  deleteArticle(articleID: number, docType: DocType): Observable<any> {
    return this.http.get(`Articls/DeleteArticle?ID=${articleID}`)
      .pipe(
        this.loaderService.useLoader,
        tap(() => {
          switch (docType) {
            case DocType.eparchy: {
              const eparchyItems = this.eparchyItems.filter(item => item.id !== articleID);
              this.eparchyItems = eparchyItems;
              this.eparchyItemsUpdated.next([...this.eparchyItems]);
              break;
            }
            case DocType.publication: {
              const publicationsItems = this.publicationsItems.filter(item => item.id !== articleID);
              this.publicationsItems = publicationsItems;
              this.publicationsItemsUpdated.next([...this.publicationsItems]);
              break;
            }
            case DocType.icons: {
              const iconsItems = this.iconsItems.filter(item => item.id !== articleID);
              this.iconsItems = iconsItems;
              this.iconsItemsUpdated.next([...this.iconsItems]);
              break;
            }
            default: {
              break;
            }
          };
        })
      )
  }

}
