import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate, CanActivateChild {
  constructor(
    private authServ: AuthService,
    private router: Router
  ){}

  canActivate(): boolean{
    if(this.authServ.isLoggedIn()){
      return true
    }else{
      this.router.navigate(['/auth'])
      return false;
    }
  }

  canActivateChild(): boolean{
    if(this.authServ.isLoggedIn()){
      this.router.navigate(['/home']);
      return false;
    }else{
      return true;
    }
  }
  
}
