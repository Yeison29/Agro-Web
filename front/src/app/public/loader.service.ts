import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  active$ = new Subject<String>();

  setActive(){
    this.active$.next('active');
  }

  setInactive(){
    this.active$.next('');
  }
}