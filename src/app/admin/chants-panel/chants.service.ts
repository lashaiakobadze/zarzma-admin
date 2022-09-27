import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, tap } from 'rxjs';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ChantInterface } from '../interfaces/chant.interface';
import { Chant } from '../models/chant.model';

@Injectable({
  providedIn: 'root'
})
export class ChantService {
  chantsItems: ChantInterface[] = [];
  private chantsItemsUpdated = new Subject<ChantInterface[]>();

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
    public route: Router
  ) { }

  getChants(): Observable<ChantInterface[]> {
    return this.http.get<ChantInterface[]>(`chants/ChantData`)
      .pipe(
        tap((chantsData: ChantInterface[]) => {
          this.loaderService.useLoader;
          this.chantsItems = chantsData;
          this.chantsItemsUpdated.next([...this.chantsItems]);
        })
      );
  }

  getChantsItemsListener(): Observable<ChantInterface[]> {
    return this.chantsItemsUpdated.asObservable();
  }

  // ToDo: არ მუშაობს, აქაც მინდა რესფონსში ობიექტის გამოგზავნა;
  storeChant(chant: Chant): Observable<Chant> {
    return this.http.post<Chant>('Chants/AddChant', chant)
      .pipe(
        tap(() => {
          this.loaderService.useLoader;
          const chantData: ChantInterface = chant as unknown as ChantInterface;

          this.chantsItems = [...this.chantsItems, chantData];
          this.chantsItemsUpdated.next([...this.chantsItems]);
        })
      );
  }

  deleteChant(id: number): Observable<any>  {
    return this.http.get(`Chants/DeleteChant?ID=${id}`)
      .pipe(
        tap(() => {
          this.loaderService.useLoader;
          const chantsItems = this.chantsItems.filter(item => item.id !== id);
          this.chantsItems = chantsItems;
          this.chantsItemsUpdated.next([...this.chantsItems]);
        })
      );
  }
}
