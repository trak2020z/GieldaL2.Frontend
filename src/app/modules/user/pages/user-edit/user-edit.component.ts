import { Component, OnInit } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup, FormControl, FormGroupDirective, Validators, NgForm} from '@angular/forms';
import { UserEdit } from 'src/app/_models/userEdit.model';
import { ContextService } from 'src/app/_services/context.service';
import { UserService } from 'src/app/_services/user.service';

class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (form.touched || form.dirty) && form.invalid;
  }
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  hidePassOld = true;
  hidePass = true;
  hideRepeatPass = true;

  editUserFormMain: FormGroup;
  editUserFormPassword: FormGroup;
  userEditModel: UserEdit;
  userId: number;

  errorMatcher = new CrossFieldErrorMatcher();

  constructor(private formBuilder: FormBuilder, private contextService: ContextService, 
    private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit() {
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
    this.editUserFormPassword = this.formBuilder.group({
      oldPassCtrl: new FormControl('', Validators.required),
      passCtrl: new FormControl('', Validators.required),
      repeatPassCtrl: new FormControl('', Validators.required),
    }, {validator: this.passwordValidator });
  }

  getUserData() {
    this.contextService.getContext().subscribe(
      data => {
        this.userEditModel = data.data.user;
        this.userId = data.data.user.id;
      }
    );
  }

  updateUserData() {
    // this.userService.update(this.userId, this.userEditModel).subscribe(
    //   data => {
    //     this.snackBar.open('User data updated successfully', 'Close', {
    //       duration: 2000,
    //     });
    //   }
    // );
  }

  passwordValidator(form: FormGroup) {

    const pass = form.get('passCtrl');
    const repeatPass = form.get('repeatPassCtrl');
    const condition = (repeatPass.dirty || repeatPass.touched) && pass.value !== repeatPass.value;

    return condition ? { passwordsDoNotMatch: true} : null;
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
