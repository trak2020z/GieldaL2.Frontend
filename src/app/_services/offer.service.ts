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

  createBuyOffer(buyOffer: Offer): Observable<any> {
    return this.http.post<Offer>(API_URL + '/Offers/buy', buyOffer);
  }

  createSellOffer(sellOffer: Offer): Observable<any> {
    return this.http.post<Offer>(API_URL + '/Offers/sell', sellOffer);
  }

  deleteSellOffer(sellOfferId: number): Observable<any> {
    return this.http.delete<Offer>(API_URL + '/Offers/sell/' + sellOfferId);
  }

  deleteBuyOffer(buyOfferId: number): Observable<any> {
    return this.http.delete<Offer>(API_URL + '/Offers/buy/' + buyOfferId);
  }

}
