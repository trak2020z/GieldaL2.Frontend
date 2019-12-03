import { Injectable } from '@angular/core';
import { UserEdit } from '../_models/userEdit.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://gieldal2.azurewebsites.net/api/Users';

  constructor(private http: HttpClient) { }

  public update(id: number, model: UserEdit): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/' + id, model);
  }
}
