import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {
  tokenLessRoutes: string[] = [
    '/token',
    '/create-user',
    '/get-all-type-documents',
    '/get-all-gender',
    '/get-all-contries',
    '/get-all-departments',
    '/get-all-municipalities',
  ];

  // constructor(private load: LoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    // this.load.setActive();
    let cloneReq = request;
    
    if (
      this.tokenLessRoutes.some((ruta) => ruta === request.url.split('?')[0])
    ) {
      return next.handle(request);
    } else if (typeof localStorage !== 'undefined') {

      cloneReq = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        },
      });
    }

    return next.handle(cloneReq).pipe(
      finalize(() => {
        // this.load.setInactive();
      })
    );
  }
}
