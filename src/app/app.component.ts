import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <app-nav></app-nav>
    <h1>Welcome to {{title}}!</h1>
    <router-outlet />
  `,
  standalone: true,
  imports: [RouterOutlet, NavComponent],
  styles: ``,
})
export class AppComponent {
  title = 'Angular training basics';
}
