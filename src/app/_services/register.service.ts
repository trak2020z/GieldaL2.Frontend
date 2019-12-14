import { Injectable } from '@angular/core';
import { RegisterModel } from '../_models/register.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../_configs/API_URL';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  baseUrl = API_URL + '/Users';

  constructor(private http: HttpClient) { }

  public register(model: RegisterModel): Observable<any> {
    return this.http.post<any>(this.baseUrl, model);
  }
}
