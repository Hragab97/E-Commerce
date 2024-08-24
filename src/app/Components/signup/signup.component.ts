import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from "../../shared/ui/alert/alert.component";
import { confirmPassword } from '../../shared/utils/confirm-password.utils';
import { signUpValidators } from '../../shared/validators/register.validators';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, AlertComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  registerform: FormGroup = new FormGroup({
    name: new FormControl(null, signUpValidators.name),
    email: new FormControl(null, signUpValidators.email),
    password: new FormControl(null, signUpValidators.password),
    rePassword: new FormControl(null)
  },confirmPassword)

  sendData = () => {

    if (this.registerform.valid) {
      console.log(this.registerform.value)

    }
  }
}
