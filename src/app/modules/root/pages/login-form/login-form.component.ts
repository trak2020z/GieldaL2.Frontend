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

  constructor(private router: Router, private authService: AuthService, private token: TokenStorage, private alert: MatSnackBar) {
  }

  username: string;
  password: string;

  ngOnInit() {
  }

  login(): void {
    this.authService.attemptAuth(this.username, this.password).subscribe(
      data => {
        if (data.token !== '') {
          this.token.saveToken(data.token);
          console.log(this.token.getToken());
          this.router.navigate(['user']);
        } else {
          this.alert.open('Wrong login or password', 'Close', {duration: 2000});
        }
      }
    );
  }

}
