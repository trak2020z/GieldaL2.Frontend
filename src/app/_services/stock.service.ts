import { Injectable } from '@angular/core';
import { STOCK } from 'src/app/_mocks/stockMock';
import { Stock } from '../_models/stock.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { API_URL } from 'src/app/_configs/API_URL'
import { ApiResponse } from '../_models/apiResponse';

/**
 * Temporary authorization
 */
const httpOptions = {
  headers: new HttpHeaders({
    'accept': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluIiwibmJmIjoxNTc0NzU5NTQ4LCJleHAiOjE1NzUzNjQzNDgsImlhdCI6MTU3NDc1OTU0OH0.trVy_M7gyFJBxVxLMf1h9XE5E7LZxiTj1J9ppf06RjQ'
  })
};

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  getStocks(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(API_URL + '/Stocks', httpOptions);
  }

  getStock(id: number): Observable<Stock> {
    return of(STOCK[id]);
  }
}
