import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from "../../shared/ui/alert/alert.component";
import { confirmPassword } from '../../shared/utils/confirm-password.utils';
import { signUpValidators } from '../../shared/validators/register.validators';
import { NgClass } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, AlertComponent, NgClass],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  isBtnSubmit: boolean = false;
  errorMessage: String = "";


  private readonly _AuthService = inject(AuthService)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Router = inject(Router)

  // registerform: FormGroup = new FormGroup({
  //   name: new FormControl(null, signUpValidators.name),
  //   email: new FormControl(null, signUpValidators.email),
  //   password: new FormControl(null, signUpValidators.password),
  //   rePassword: new FormControl(null)
  // }, confirmPassword)

  registerform: FormGroup = this._FormBuilder.group({
    name: [null, signUpValidators.name],
    email: [null, signUpValidators.email],
    password: [null, signUpValidators.password],
    rePassword: [null, signUpValidators.rePassword]
  }, { validators: [confirmPassword] })

  sendData = () => {
    this.isBtnSubmit = true;
    if (this.registerform.valid) {
      console.log(this.registerform)
      this._AuthService.signUp(this.registerform.value).subscribe({
        next: (res) => {

          if (res.message == "success") {
            this._Router.navigate(['/signin'])
            this.isBtnSubmit = false;
          }

          console.log(res)
        }, error: (err: HttpErrorResponse) => {
          console.log(err.error.message)
          this.isBtnSubmit = false;
          this.errorMessage = err.error.message
        },
      })

    } else {
      this.registerform.get('rePassword')?.setValue("")
      this.registerform.markAllAsTouched()
    }
  }
}
