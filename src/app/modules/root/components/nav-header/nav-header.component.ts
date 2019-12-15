import { Component, OnInit } from '@angular/core';
import {TokenStorage} from '../token.storage';
import {AuthService} from '../../../../_services/auth.service';
import {Observable} from 'rxjs';
import {ContextService} from '../../../../_services/context.service';

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

  ngOnInit() {
      this.username.subscribe(d => this.userLogin = d);
      this.cash.subscribe(d => this.userCash = d);
  }

}
