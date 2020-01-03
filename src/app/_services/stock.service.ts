import { Injectable } from '@angular/core';
import { STOCK } from 'src/app/_mocks/stockMock';
import { Stock } from '../_models/stock.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { API_URL } from 'src/app/_configs/API_URL'
import { ApiResponse } from '../_models/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  getStocks(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(API_URL + '/Stocks');
  }

  getStock(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(API_URL + '/Stocks/' + id);
  }
}
