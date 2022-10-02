import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let authToken: string =  localStorage.getItem('token');
    if (authToken) {
      authToken = authToken.replace(/"+/g, "");
    }

    if (authToken) {
      request = request.clone({ headers: request.headers.set('Zarzma_Session', authToken) });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }));
  }

}
