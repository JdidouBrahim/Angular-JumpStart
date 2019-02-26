import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { CustomerEditComponent } from '../customer-edit/customer-edit.component';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {

  constructor(private authService:AuthService,private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('trying to enter customer edit component ...')
      if(this.authService.isAuthenticated){
        return true;
      }
       // Track URL user is trying to go to so we can send them there after logging in
       console.log('state : '+state)
    this.authService.redirectUrl = state.url;
    this.router.navigate(['/login']);
    return false;
  }
  
}
