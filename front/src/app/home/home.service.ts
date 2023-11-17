import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private elementoSource = new BehaviorSubject<any>(null);
  elemento$ = this.elementoSource.asObservable();

  baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private router: Router) { }

  getAllTypeDocuments(){
    return this.http.get(`${this.baseUrl}/get-all-type-documents`);
  }

  getAllGenders(){
    return this.http.get(`${this.baseUrl}/get-all-gender`);
  }

  getAllMunicipalities(id: any){
    return this.http.get(`${this.baseUrl}/get-all-municipalities?id_department=${id}`);
  }

  getAllDepartments(id: any){
    return this.http.get(`${this.baseUrl}/get-all-departments?id_country=${id}`);
  }

  getAllCountries(){
    return this.http.get(`${this.baseUrl}/get-all-countries`);
  }

  getWeeksService(id: any){
    return this.http.get(`${this.baseUrl}/weeks-statisticas?harvest_id=${id}`);
  }

  getAllHarvest(){
    return this.http.get(`${this.baseUrl}/get-all-harvests`);
  }

  addUser(data : any): Observable<any>{
    return this.http.post(`${this.baseUrl}/create-user`,data);
  }

}
