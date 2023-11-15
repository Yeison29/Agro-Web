import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  // constructor(private load: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    // this.load.setActive();

    let cloneReq = request;

    cloneReq = request.clone(
      {
        setHeaders:{
          Authorization: 'Bearer ' + localStorage.getItem("access_token")
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