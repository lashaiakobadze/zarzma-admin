import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize, switchMapTo, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading = 0;

  startLoading(): void {
    this.isLoading++;
  }

  endLoading(): void {
    this.isLoading = Math.max(this.isLoading - 1, 0);
  }

  useLoader = <T>(obs: Observable<T>): Observable<T> => {
    return of(null).pipe(
      tap(() => this.startLoading()),
      switchMapTo(obs),
      finalize(() => this.endLoading())
    );
  }
}
