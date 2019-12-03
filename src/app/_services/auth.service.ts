import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorage} from '../modules/root/components/token.storage';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://gieldal2.azurewebsites.net/api/Auth';

  constructor(private http: HttpClient, private token: TokenStorage, private router: Router) {
  }

  attemptAuth(user: string, pass: string): Observable<any> {
    const credentials = {username: user, password: pass};
    return this.http.post<any>(this.baseUrl, credentials);
  }

  logout() {
    this.token.signOut();
    this.router.navigate(['']);
  }

  isLoggedIn(): boolean {
    if (window.sessionStorage.getItem('AuthToken') != null) {
      return true;
    } else {
      return false;
    }
  }
}
