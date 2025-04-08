import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-register',
  standalone: true,
  imports: [FormsModule],
  template: `
  <h2> Template based form </h2>
    <form (submit)="login()">
      <label for="name">Name:</label>
      <input type="text" name="name" [(ngModel)]="user.name" />
      <label for="email">Email:</label>
      <input type="email" name="email" [(ngModel)]="user.email"/>
      <label for="password">Password:</label>
      <input type="password" name="password" [(ngModel)]="user.password"/>
      <button type="submit">Login</button>
    </form>
  `,
  styles: `
  label, input {
    display: block;
    margin: 0.5rem 0;
  }`
})
export class TemplateRegisterComponent {
   user = {
    name: '',
    email: '',
    password: ''
   }
   login(){
    alert(this.user.name + " " + this.user.email + " " + this.user.password)
   }
}
