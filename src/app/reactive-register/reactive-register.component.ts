import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators, ValidatorFn, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reactive-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <h2>Reactive form</h2>
  <form [formGroup]="loginForm" (submit)="login()">

  <label for="name">Name:</label>
  <input id="name" formControlName="name" />
  @if (loginForm.controls.name.invalid && loginForm.controls.name.touched) {
        @let name = loginForm.controls.name;
        @if (name.hasError('required')) {
          <p style="color:red">
            The name cannot be empty
          </p>
        }
  }

  <label for="email">Email:</label>
  <input id="email" type="email" formControlName="email" />
  @if (loginForm.controls.email.invalid && loginForm.controls.email.touched) {
        @let email = loginForm.controls.email;
        @if (email.hasError('wrongDomain')) {
          <p style="color:red">
            The domain
            {{ email.getError('wrongDomain') }}
            is not allowed
          </p>
        }
        @if (email.hasError('required')){
          <p style="color:red">The email cannot be empty</p>
        }
        @if(email.hasError('email')){
          <p style="color:red">
            The given email address is not valid.
          </p>
        }
  }
  <label for="password">Password:</label>
  <input id="password" type="password" formControlName="password" />
  @if (loginForm.controls.password.invalid && loginForm.controls.password.touched) {
        @let password = loginForm.controls.password;
        @if (password.hasError('minlength')) {
          <p style="color:red">
            Minimum password length is
            {{ password.getError('minlength').requiredLength }}
            characters
          </p>
        }
        @if (password.hasError("required")){
          <p style="color:red">The password cannot be empty</p>
        }
      }
  <label for="approval">
  <input id="approval" type="checkbox" formControlName="approval" />
  I approve the terms
  </label>
  @if (loginForm.controls.approval.invalid && loginForm.controls.approval.touched) {
        @let approval = loginForm.controls.approval;
        @if (approval.hasError('required')) {
          <p style="color:red">
            Mandatory to proceed
          </p>
        }
  }

  <button type="submit" [disabled]="!shouldBeEnabled()">Login</button>
  </form>
  <button (click) = "reset()">Reset</button>

  `,
  styles: `
  label, input {
    display: block;
    margin: 0.5rem 0;
  }
    `
})
export class ReactiveRegisterComponent {

  loginForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      emailAdressesValidator("hotmail.com"),
      emailAdressesValidator("gmail.com")
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(6)
    ]),
    approval: new FormControl(false,[
      Validators.requiredTrue
    ])
  })

  reset(){
    this.loginForm.patchValue({
      email: '',
      name: '',
      password: '',
      approval: false
    })
  }

  login(){

    this.loginForm.markAllAsTouched();

    const email = this.loginForm.value.email
    const password = this.loginForm.value.password
    const name = this.loginForm.value.name
    const approval = this.loginForm.value.approval

    alert(name + " " + email + " " + password + " " + approval)
  }

  shouldBeEnabled (){
    return this.loginForm.valid
  }


}

function emailValidator(control: AbstractControl, domain: string): ValidationErrors| null{
  const value:string = control.value
  if(value && value.length > domain.length){
    if(value.endsWith(domain)){
      return {wrongDomain: domain}
    }
  }
  return null
}

function emailAdressesValidator(domain: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: string } | null => {
      return emailValidator(control, domain);
  };
}
