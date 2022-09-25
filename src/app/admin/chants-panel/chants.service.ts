import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
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

  getChants(): void {
    this.http.get<ChantInterface[]>(`chants/ChantData`)
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
    return this.http.post<Chant>('chants/AddChant', chant)
      .pipe(this.loaderService.useLoader);
  }

  deleteChant(id: number) {
    this.http.get(`chants/DeleteChant?ID=${id}`)
      .pipe(this.loaderService.useLoader).subscribe(() => {
        const chantsItems = this.chantsItems.filter(item => item.id !== id);
        this.chantsItems = chantsItems;
        this.chantsItemsUpdated.next([...this.chantsItems]);
      })
  }
}
