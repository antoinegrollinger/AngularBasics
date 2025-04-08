import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  imports: [RouterLink],
  template: `
    <p>
      You are not allowed to see this news.
    </p>
    <p><a routerLink="/news">Go back to news list</a></p>
  `,
  styles: ``
})
export class UnauthorizedComponent {

}
