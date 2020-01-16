import {Injectable} from '@angular/core';


const TOKEN_KEY = 'AuthToken';

@Injectable()
export class TokenStorage {

  constructor() {
  }

  /**
   * Removes token from session storage and clear
   */
  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
  }

  /**
   * Removes previous token and saves token to the session storage
   * @param token
   */
  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Returns token from session storage
   */
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
}
