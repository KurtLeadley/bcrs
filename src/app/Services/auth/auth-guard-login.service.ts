/**
 * Title: Services/auth/auth-guard-login.service.ts
 * Author: Nathaniel Liebhart
 * Description: bcrs
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthLoginGuard implements CanActivate {
  constructor(public auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    if (this.auth.loggedIn) {
      return true;
    } else {
      return this.router.parseUrl('/login');
    }
  }
}
