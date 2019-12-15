import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AuthService} from '../../../../_services/auth.service';
import {TokenStorage} from '../../components/token.storage';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private alert: MatSnackBar) {
  }

  username: string;
  password: string;

  ngOnInit() {
  }

  login() {
    this.authService.login(this.username, this.password);
  }

}
