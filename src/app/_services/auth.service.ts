import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://gieldal2.azurewebsites.net/api/Auth';

  constructor(private http: HttpClient) {
  }

  attemptAuth(user: string, pass: string): Observable<any> {
    const credentials = {username: user, password: pass};
    return this.http.post<any>(this.baseUrl, credentials);
  }
}
