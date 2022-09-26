import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

const BASE_URL = environment.dataUrl;

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('assets/i18n')) {
      request = request.clone({ url: BASE_URL + request.url });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }));
  }
}
