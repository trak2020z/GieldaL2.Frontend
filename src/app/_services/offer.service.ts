import { Injectable } from '@angular/core';
import { BuyOffer } from '../_models/buyOffer.model';
import { Observable } from 'rxjs';
import { API_URL } from '../_configs/API_URL';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(private http: HttpClient) { }

  createBuyOffer(buyOffer: BuyOffer): Observable<any>{
    return this.http.post<BuyOffer>(API_URL + '/Offers/buy', buyOffer);
  }
}
