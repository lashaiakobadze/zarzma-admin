import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, Observable, tap, map } from 'rxjs';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { DocType } from '../enums/docType.enum';
import { DocTypeName } from '../enums/docTypeName.enum';
import { ArticleInterface } from '../interfaces/article.interface';
import { Article } from '../models/article.model';

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
      .get<ArticleInterface[]>(`articls/ArticleData?docType=${DocType.eparchy}`)
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
      .get<ArticleInterface[]>(`articls/ArticleData?docType=${DocType.icons}`)
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
      .get<ArticleInterface[]>(`articls/ArticleData?docType=${DocType.publication}`)
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

  storeArticle(article: Article): Observable<ArticleInterface> {
    return this.http.post<{ newArticle: ArticleInterface }>('Articls/AddArticle', article)
      .pipe(
        this.loaderService.useLoader,
        map((newArticleData: { newArticle: ArticleInterface }) => newArticleData.newArticle),
        tap((newArticle: ArticleInterface) => {
          switch (newArticle.docTypeID) {
            case DocType.eparchy: {
              this.eparchyItems = [...this.eparchyItems, newArticle];
              this.eparchyItemsUpdated.next([...this.eparchyItems]);
              break;
            }
            case DocType.publication: {
              this.publicationsItems = [...this.publicationsItems, newArticle];
              this.publicationsItemsUpdated.next([...this.publicationsItems]);
              break;
            }
            case DocType.icons: {
              this.iconsItems = [...this.iconsItems, newArticle];
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

  updateArticle(article: Article): Observable<ArticleInterface> {
    return this.http.post<ArticleInterface>('Articls/UpdateArticle', article).pipe(
      this.loaderService.useLoader
    );
  }

  deleteArticle(articleID: number, docTypeName: DocTypeName): Observable<unknown> {
    return this.http.get(`Articls/DeleteArticle?ID=${articleID}`)
      .pipe(
        this.loaderService.useLoader,
        tap(() => {
          switch (docTypeName) {
            case DocTypeName.eparchy: {
              const eparchyItems = this.eparchyItems.filter(item => item.id !== articleID);
              this.eparchyItems = eparchyItems;
              this.eparchyItemsUpdated.next([...this.eparchyItems]);
              break;
            }
            case DocTypeName.publication: {
              const publicationsItems = this.publicationsItems.filter(item => item.id !== articleID);
              this.publicationsItems = publicationsItems;
              this.publicationsItemsUpdated.next([...this.publicationsItems]);
              break;
            }
            case DocTypeName.icons: {
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
