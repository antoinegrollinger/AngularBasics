import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
      <label for="username">Username</label>
      <input id="username" formControlName="username" required>
      <label for="password">Password</label>
      <input id="password" type="password" formControlName="password" required>
      <button type="submit" [disabled]="signupForm.invalid">Sign Up</button>
    </form>
  `,
  styles: ``
})
export class SignupComponent {
  constructor(private authService: AuthService, private router: Router) { }
  signupForm: FormGroup = new FormGroup({
    username: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true })
  });

  onSubmit(){
    this.authService.login();
    this.router.navigate(['news']);
  }
}
