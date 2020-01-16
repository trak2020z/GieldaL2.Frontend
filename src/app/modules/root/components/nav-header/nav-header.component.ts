import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../_services/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit {

  title = 'GieldaL2';
  loginText = 'Log In';
  logoutText = 'Logout';
  username: Observable<string>;
  cash: Observable<string>;
  userLogin: string;
  userCash: string;

  constructor(private auth: AuthService) {
    this.username = this.auth.getUserLogin;
    this.cash = this.auth.getUserCash;
  }

  /**
   * Updates user's login and cash placed in button
   */
  ngOnInit() {
      this.username.subscribe(d => this.userLogin = d);
      this.cash.subscribe(d => this.userCash = d);
  }

}
