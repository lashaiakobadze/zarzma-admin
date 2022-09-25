import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const lang = localStorage.getItem('lang') || 'en';

    // რექვესთებს ჩავუსეტო ენა ამ მეთოდით, და ენის სერვისი, რომლითაც ხელით მიწევს ჩასეტვა ენის ამოვიღო ეგ ფუნქციონალი.
    if (!request.headers.has('docLang')) {
      // request = request.clone({ headers: request.headers.set('docLang', lang) });
      console.log('LanguageInterceptor--->>>');
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
          // if (event instanceof HttpResponse) {
          //     console.log('LanguageInterceptor--->>>', event);
          // }
          return event;
      }));
  }
}
