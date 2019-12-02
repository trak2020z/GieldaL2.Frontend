import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ApiResponse } from '../_models/apiResponse';
import { API_URL } from '../_configs/API_URL';

const httpOptions = {
  headers: new HttpHeaders({
    'accept': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("AuthToken")
  })
};

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  constructor(private http: HttpClient) { }

  getContext(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(API_URL + '/Context', httpOptions);
  }
}
