import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit {

  title = 'GieldaL2';
  loginText = 'Log In';
  logoutText = 'Logout';
  constructor() { }

  ngOnInit() {
  }

}
