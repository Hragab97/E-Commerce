import { Component, inject } from '@angular/core';
import { AlertComponent } from "../../shared/ui/alert/alert.component";
import { signUpValidators } from '../../shared/validators/register.validators';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [AlertComponent, ReactiveFormsModule, NgClass, RouterLink, RouterLinkActive],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  isBtnSubmit: boolean = false;
  errorMessage: String = "";

  private readonly _AuthService = inject(AuthService)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Router = inject(Router)

  logInForm: FormGroup = this._FormBuilder.group({
    email: [null, signUpValidators.email],
    password: [null, signUpValidators.password],
  })

  sendData = () => {
    this.isBtnSubmit = true;
    if (this.logInForm.valid) {
      console.log(this.logInForm)
  
      this._AuthService.signIn(this.logInForm.value).subscribe({
        next: (res) => {

          console.log(res.token)

          if (res.message == "success") {
            localStorage.setItem('token',res.token)
            console.log('token',res.token)
            this._AuthService.saveUserData()
            this._Router.navigate(['/home'])
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
      this.logInForm.get('rePassword')?.setValue("")
      this.logInForm.markAllAsTouched()
    }
  }

}
