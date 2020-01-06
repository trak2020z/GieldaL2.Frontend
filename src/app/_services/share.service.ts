import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/_configs/API_URL';
import { ApiResponse } from '../_models/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(private http: HttpClient) { }

  getShares(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(API_URL + '/Shares');
  }

  getShare(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(API_URL + '/Shares/' + id);
  }
}