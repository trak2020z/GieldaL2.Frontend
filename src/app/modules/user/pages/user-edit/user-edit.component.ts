import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup, FormControl, FormGroupDirective, Validators, NgForm} from '@angular/forms';
import { UserEdit } from 'src/app/_models/userEdit.model';
import { ContextService } from 'src/app/_services/context.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  editUserFormMain: FormGroup;
  userEditModel: UserEdit;
  userId: number;

  constructor(private formBuilder: FormBuilder, private contextService: ContextService,
              private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.userId = 0;
    this.createForm();
    this.getUserData();
  }

  createForm() {
    this.userEditModel = new UserEdit();

    this.editUserFormMain = this.formBuilder.group({
      nameCtrl: new FormControl('', Validators.required),
      surnameCtrl: new FormControl('', Validators.required),
      loginCtrl: new FormControl('', Validators.required),
      emailCtrl: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    });
  }

  getUserData() {
    this.contextService.getContext().subscribe(
      data => {
        this.userEditModel.name = data.data.user.name;
        this.userEditModel.surname = data.data.user.surname;
        this.userEditModel.login = data.data.user.login;
        this.userEditModel.eMail = data.data.user.eMail;
        this.userEditModel.value = data.data.user.value;

        this.userId = data.data.user.id;
      }
    );
  }
  
  updateUserData() {
    this.userService.update(this.userId, this.userEditModel).subscribe(
      response => {
        if(response) {
          this.snackBar.open('User data updated successfully', 'Close', {
            duration: 2000,
          });
        } else {
          this.snackBar.open('An error occurred while updating user data', 'Close', {
            duration: 2000,
          });
      }
  }
  );
}

  getFormControl(form: FormGroup, name: string) {
    if (form) {
      return form.get(name);
    } else {
      return null;
    }
  }

  hasError(form: FormGroup, name: string) {
    const it = this.getFormControl(form, name);
    return it && (it.dirty || it.touched) && !it.valid;
  }

}
