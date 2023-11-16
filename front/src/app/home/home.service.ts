import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

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

}
