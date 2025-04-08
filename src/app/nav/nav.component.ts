import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  template: `
  <ul>
    <li><a routerLink="/news">News list</a></li>
    <li><a routerLink="/category">Category</a></li>
    @if(!isSignedIn()){
      <li><a routerLink="/signup">Sign up</a></li>
    }
    @if(isSignedIn()){
      <li><button (click) = "logout()">Logout</button></li>
    }
  </ul>
  `,
  styles: ``
})
export class NavComponent {
  constructor(private authService: AuthService, private router: Router) { }

  isSignedIn(){
    return this.authService.isAuthenticated()
  }

  logout() {
    if(this.authService.isAuthenticated()) {
      this.authService.logout()
      this.router.navigate(['/signup'])
    }
  }
}
