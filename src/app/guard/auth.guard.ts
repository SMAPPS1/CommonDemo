import { AuthService } from '../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     debugger
    // console.log(this.auth.getPortalType());
    const returnValue: string = this.auth.getPortalType();
    if (!this.auth.gettoken()) {
      if(returnValue == "vendorregistration"){
        this.router.navigateByUrl("/VendorLogin");
      }
      else{
        this.router.navigateByUrl("/login");
      }
      
    }
    else {
      return this.auth.gettoken();
    }
  }
}

