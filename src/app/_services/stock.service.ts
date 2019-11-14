import { Injectable } from '@angular/core';
import { STOCK } from 'src/app/_mocks/stockMock';
import { Stock } from '../_models/stock.model';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor() { }

  getStocks() : Observable<Stock[]>{
    return of(STOCK);
  }

  getStock(id : number) : Observable<Stock>{
    return of(STOCK[id]);
  }

  
}
