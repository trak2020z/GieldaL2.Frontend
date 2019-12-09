import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorage} from '../modules/root/components/token.storage';
import {Router} from '@angular/router';
import { API_URL } from '../_configs/API_URL';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private token: TokenStorage, private router: Router) {
  }

  attemptAuth(user: string, pass: string): Observable<any> {
    const credentials = {username: user, password: pass};
    return this.http.post<any>(API_URL + '/Auth', credentials);
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
