/**
 * Title: guards/authorization.guard.ts
 * Authors: Group 4
 * Description: bcrs
 */
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAdmin = this.auth.getCurrentRole();
    if (isAdmin.toLowerCase() !== 'admin') {
      this.router.navigate(['/error/401']);
    }
    return true;
  }
}
