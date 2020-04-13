/**
 * Title: Services/auth/auth.service.ts
 * Author: Nathaniel Liebhart
 * Description: bcrs
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

import { UserService } from '../user.service';
import { User } from '../../Models/user.model';

import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  loggedIn = false;
  isAdmin = false;

  jwtHelper: JwtHelperService = new JwtHelperService();

  currentUser: User = new User();

  constructor(private userService: UserService, private router: Router, private cookie: CookieService) {
    const token = localStorage.getItem('token');
    if (token) {
      // token is often undefined, yet we are still getting to this console.log
      // also, this is checking for a token every time someone tries to click "Login"
      // if they aren't logged in, they shouldn't have a token.
      console.log(token);
      const decodedUser = this.jwtHelper.decodeToken(token);
      this.setCurrentUser(decodedUser);
    }
  }

  login(usernameAndPassword) {
    console.log(usernameAndPassword);
    return this.userService.login(usernameAndPassword).pipe(
      map((res) => {
        console.log(res);
        console.log("got here?");
        localStorage.setItem('token', res.token);
        this.cookie.set('token ', res.token, 1);
        const decodedUser = this.jwtHelper.decodeToken(res.token);
        this.setCurrentUser(decodedUser);
        console.log(this.loggedIn);
        return this.loggedIn;
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isAdmin = false;
    this.currentUser = new User();
    this.router.navigate(['/']);
  }

  // getCurrentUser() {
  //   this.userService.me().pipe(
  //     map((res) => {
  //       if (res.disabled === false) {
  //         this.currentUser = res;
  //       } else {
  //         this.loggedIn = false;
  //         console.log('User is either disabled or does not exists!');
  //       }
  //     })
  //   );
  // }

  getToken() {
    return localStorage.getItem('token');
  }

  setCurrentUser(decodedUser) {
    this.loggedIn = true;
    this.currentUser.id = decodedUser._id;
    this.currentUser.userName = decodedUser.username;
    this.currentUser.role = decodedUser.role;
    decodedUser.role === 'admin' ? (this.isAdmin = true) : (this.isAdmin = false);
    delete decodedUser.role;
  }
}
