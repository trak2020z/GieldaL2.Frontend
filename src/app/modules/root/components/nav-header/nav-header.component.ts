import { Component, OnInit } from '@angular/core';
import {TokenStorage} from '../token.storage';
import {AuthService} from '../../../../_services/auth.service';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit {

  title = 'GieldaL2';
  loginText = 'Log In';
  logoutText = 'Logout';
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

}
