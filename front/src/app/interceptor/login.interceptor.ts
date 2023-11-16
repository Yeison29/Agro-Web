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

tokenLessRoutes: string[] = ['/get-all-type-documents', '/get-all-gender', '/get-all-contries', '/get-all-departments', '/get-all-municipalities'];

  // constructor(private load: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    // this.load.setActive();
    console.log(request.url.split('?')[0])

    if (this.tokenLessRoutes.some(ruta => ruta === request.url.split('?')[0])) {
      console.log(request.url)
      return next.handle(request);
    }else {
      console.log("entro")
      return next.handle(request);
    }

    let cloneReq = request;

    cloneReq = request.clone(
      {
        setHeaders:{
          // Authorization: 'Bearer ' + localStorage.getItem("access_token")
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