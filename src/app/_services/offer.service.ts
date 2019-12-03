import { Injectable } from '@angular/core';
import { Offer } from '../_models/offer.model';
import { Observable } from 'rxjs';
import { API_URL } from '../_configs/API_URL';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(private http: HttpClient) { }

  createBuyOffer(buyOffer: Offer): Observable<any>{
    return this.http.post<Offer>(API_URL + '/Offers/buy', buyOffer);
  }
}
