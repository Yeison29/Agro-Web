import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { constants } from 'buffer';

@Injectable({
  providedIn: 'root',
})
export class HomeService {

  id_user: any;

  private elementoSource = new BehaviorSubject<any>(null);
  elemento$ = this.elementoSource.asObservable();

  baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private router: Router) {}

  getAllTypeDocuments() {
    return this.http.get(`${this.baseUrl}/get-all-type-documents`);
  }

  getAllGenders() {
    return this.http.get(`${this.baseUrl}/get-all-gender`);
  }

  getAllMunicipalities(id: any) {
    return this.http.get(
      `${this.baseUrl}/get-all-municipalities?id_department=${id}`
    );
  }

  getAllDepartments(id: any) {
    return this.http.get(
      `${this.baseUrl}/get-all-departments?id_country=${id}`
    );
  }

  getAllCountries() {
    return this.http.get(`${this.baseUrl}/get-all-countries`);
  }

  getWeeksService(id: any) {
    return this.http.get(`${this.baseUrl}/weeks-statisticas?harvest_id=${id}`);
  }

  getAllHarvest() {
    return this.http.get(`${this.baseUrl}/get-all-harvests`);
  }

  addUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-user`, data);
  }

  getToken(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new HttpParams()
      .set('username', data.username)
      .set('password', data.password)
      .set('grant_type', 'password');
    return this.http.post(`http://127.0.0.1:8000/token`, body, { headers: headers });
  }

  activateAccount(code: any):  Observable<any>{
    const data_array = code.split('+');
    const data = {
      auth_id: parseInt(data_array[0], 10),
      code: data_array[1]
    }
    return this.http.put(`${this.baseUrl}/activate`, data);
  }

  getAllHarvestMunicipality(): Observable<any>{
    return this.http.get(
      `${this.baseUrl}/most-planted-crop-by-municipality`
    );
  }

  getAllHarvests(): Observable<any>{
    return this.http.get(
      `${this.baseUrl}/most-widely-planted-crops`
    );
  }

  getGenders(): Observable<any>{
    return this.http.get(
      `${this.baseUrl}/statistics-genres`
    );
  }

  getRangeAges(): Observable<any>{
    return this.http.get(
      `${this.baseUrl}/age-range`
    );
  }

  getAllCrops(): Observable<any>{
    if(typeof localStorage !== 'undefined'){
      const session = localStorage.getItem('session');
      if(session){
        this.id_user=JSON.parse(session).id_user;
      }
    }
    return this.http.get(
      `${this.baseUrl}/get-all-crops?user_id=${this.id_user}`
    );
  }

  getOneCrops(id: any){
    return this.http.get(`${this.baseUrl}/get-crop?id_crop=${id}`)
  }

  setCrop(crop: any){
    this.elementoSource.next(crop);
  }

  updateCrop(id: any, data: any): Observable<any>  {
    return this.http.put(`${this.baseUrl}/update-crop?id_crop=${id}`, data)
  }

  getHarvest(){
    return this.http.get(`${this.baseUrl}/get-all-harvests`)
  }

  addCrops(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-crop`, data);
  }

  getDataDane(): Observable<any> {
    return this.http.get(`${this.baseUrl}/table-price`)
  }

}
