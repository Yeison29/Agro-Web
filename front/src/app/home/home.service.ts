import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseUrl = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient, private router: Router) { }

  addUser(){
    return this.http.get(`${this.baseUrl}/profile`, {
    });
  }
}
