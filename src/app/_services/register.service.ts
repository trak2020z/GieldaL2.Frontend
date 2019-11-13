import { Injectable } from '@angular/core';
import { RegisterModel } from '../_models/register.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }

  public register(model: RegisterModel): Observable<number> {
    return of(0);
  }
}
