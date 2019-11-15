import { Component, OnInit } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup, FormControl, FormGroupDirective, Validators, NgForm} from '@angular/forms';
import { RegisterModel } from 'src/app/_models/register.model';
import { RegisterService } from 'src/app/_services/register.service';

class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (form.touched || form.dirty) && form.invalid;
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  registerModel: RegisterModel;
  registerService: RegisterService;

  errorMatcher = new CrossFieldErrorMatcher();

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private stockService: RegisterService) {}

  ngOnInit() {
    this.registerModel = new RegisterModel();
    this.firstFormGroup = this.formBuilder.group({
      nameCtrl: new FormControl('', Validators.required),
      surnameCtrl: new FormControl('', Validators.required),
    });
    this.secondFormGroup = this.formBuilder.group({
      loginCtrl: new FormControl('', Validators.required),
      emailCtrl: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    });
    this.thirdFormGroup = this.formBuilder.group({
      passCtrl: new FormControl('', Validators.required),
      repeatPassCtrl: new FormControl('', Validators.required),
    }, {validator: this.passwordValidator });
  }

  register() {
    if (this.registerModel) {
      //this.registerService.register(this.registerModel);

      this.snackBar.open("Registered successfully", 'Close', {
        duration: 2000,
      });
    }
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

  isValidForm(form: FormGroup) {
    return form.valid;
  }
}
