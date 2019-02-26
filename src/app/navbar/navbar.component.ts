import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loginLogoutText: string = 'Login';
  isAuthenticated: boolean=false;
  subscription : Subscription;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.subscription = this.authService.authChanged
    .subscribe((loggedIn:boolean) =>{
      console.log('Auth changed !')
      this.loginLogoutText=this.setLoginText();
    })
    
  }

  loginOrLogout() {
    if (this.authService.isAuthenticated) {
      this.authService.logout();
      this.router.navigate(['/customers']);
    }
    else {
      this.loginLogoutText = 'Login';
      this.router.navigate(['/login']);
    }
  }

  setLoginText(): string {
    return this.authService.isAuthenticated ? 'Logout' : 'Login';
  }


}
