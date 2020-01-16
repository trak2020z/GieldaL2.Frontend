import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../../_services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  /**
   * Constructor that provides router and authentication service
   * @param router
   * @param authService
   */
  constructor(private router: Router, private authService: AuthService) {
  }

  /**
   * Storage for username
   */
  username: string;
  /**
   * Storage for password
   */
  password: string;

  /**
   * @ignore
   */
  ngOnInit() {
  }

  /**
   * Action performs when login button is clicked
   */
  login() {
    this.authService.login(this.username, this.password);
  }

}
