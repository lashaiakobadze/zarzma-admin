import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { ErrorService } from '../error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    public errorService: ErrorService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: any) => {
        let errorMessage = 'An unknown error occurred!';
        console.log(error);

        if (error.error.title) {
          errorMessage = error.error.title;
        }
        const err = new Error(errorMessage);
        this.errorService.errorMessage = err;
        return throwError(() => err);
      })
    );
  }
}
