import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {TokenStorage} from '../modules/root/components/token.storage';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {ContextService} from './context.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://gieldal2.azurewebsites.net/api/Auth';

  private userLogin = new BehaviorSubject<string>('');

  get getUserLogin() {
    return this.userLogin.asObservable();
  }

  private userCash = new BehaviorSubject<string>('');

  get getUserCash() {
    return this.userCash.asObservable();
  }

  constructor(private http: HttpClient, private token: TokenStorage, private router: Router, private alert: MatSnackBar,
              private ctx: ContextService) {
  }

  attemptAuth(user: string, pass: string): Observable<any> {
    const credentials = {username: user, password: pass};
    return this.http.post<any>(this.baseUrl, credentials);
  }

  login(username: string, password: string) {
    this.attemptAuth(username, password).subscribe(
      data => {
        if (data.token !== '') {
          this.token.saveToken(data.token);
          console.log(this.token.getToken());
          this.ctx.getContext().subscribe(
            d => {
              this.userLogin.next(d.data.user.login);
              this.userCash.next(d.data.user.value.toString());
            }
          );
          this.router.navigate(['user']);
        } else {
          this.alert.open('Wrong login or password', 'Close', {duration: 2000});
        }
      }
    );
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
