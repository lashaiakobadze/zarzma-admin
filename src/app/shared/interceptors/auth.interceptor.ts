import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/authentication/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const authToken: string = localStorage.getItem('token');

    if (authToken) {
      request = request.clone({ headers: request.headers.set('Zarzma_Session', authToken) });
      console.log('AuthInterceptor--->>>');
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
          // if (event instanceof HttpResponse) {
          //     console.log('AuthInterceptor--->>>', event);
          // }
          return event;
      }));
  }

}
