import { Injectable } from '@angular/core';
import { UserEdit } from '../_models/userEdit.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../_configs/API_URL';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = API_URL + '/Users/';

  constructor(private http: HttpClient) { }

  public update(id: number, model: UserEdit): Observable<any> {
    return this.http.put<any>(this.baseUrl + id, model);
  }
}
