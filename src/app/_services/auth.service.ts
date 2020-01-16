import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {TokenStorage} from '../modules/root/components/token.storage';
import {Router} from '@angular/router';
import {API_URL} from '../_configs/API_URL';
import {MatSnackBar} from '@angular/material';
import {ContextService} from './context.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Object which provides online update of user's login in menu button
   */
  private userLogin = new BehaviorSubject<string>('');

  get getUserLogin() {
    return this.userLogin.asObservable();
  }

  /**
   * Object which provides online update of user's cash value in menu button
   */
  private userCash = new BehaviorSubject<string>('');

  get getUserCash() {
    return this.userCash.asObservable();
  }

  constructor(private http: HttpClient, private token: TokenStorage, private router: Router, private alert: MatSnackBar,
              private ctx: ContextService) {

  }

  /**
   * Sends request with credentials in order to get authorization
   * @param user
   * @param pass
   */
  attemptAuth(user: string, pass: string): Observable<any> {
    const credentials = {username: user, password: pass};
    return this.http.post<any>(API_URL + '/Auth', credentials);
  }

  /**
   * Performs login action, sends user's login and cash to navigation button and opens user panel
   * @param username
   * @param password
   */
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

  /**
   * Logs out and open home page
   */
  logout() {
    this.token.signOut();
    this.router.navigate(['']);
  }

  /**
   * Checks if in session there is a logged in user
   */
  isLoggedIn(): boolean {
    if (window.sessionStorage.getItem('AuthToken') != null) {
      return true;
    } else {
      return false;
    }
  }
}
