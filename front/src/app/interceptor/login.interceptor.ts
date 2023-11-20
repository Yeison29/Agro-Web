import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { Token } from '@angular/compiler';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

tokenLessRoutes: string[] = ['/token' , '/create-user', '/get-all-type-documents', '/get-all-gender', '/get-all-contries', '/get-all-departments', '/get-all-municipalities'];

  // constructor(private load: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    // this.load.setActive();
    console.log(request.url.split('?')[0])

    if (this.tokenLessRoutes.some(ruta => ruta === request.url.split('?')[0])) {
      return next.handle(request);
    }

    let cloneReq = request;

    cloneReq = request.clone(
      {
        setHeaders:{
          Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ5ZUBnbWFpbC5jb20iLCJleHAiOjE3MDAxOTMzODd9.HVgdgSgwZbF3zve9Z305HH0JTIVZBfT9QNtscPvTLcg'
        }
      }
    )

    return next.handle(cloneReq).pipe(
      finalize(()=>{
        // this.load.setInactive(); 
      })
    );
  }
}