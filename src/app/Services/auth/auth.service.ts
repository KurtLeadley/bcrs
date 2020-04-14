/**
 * Title: Services/auth/auth.service.ts
 * Author: Nathaniel Liebhart
 * Description: bcrs
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';

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
      console.log(token);
      const decodedUser = this.jwtHelper.decodeToken(token);
      this.setCurrentUser(decodedUser);
    }
  }


  login(usernameAndPassword) {
    return this.userService.login(usernameAndPassword).pipe(
      map((res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.cookie.set('token ', res.token, 1);
        const decodedUser = this.jwtHelper.decodeToken(res.token);
        this.setCurrentUser(decodedUser);
        console.log(decodedUser);
        localStorage.setItem('user', decodedUser.username);
        return this.loggedIn;
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
    this.currentUser.username = decodedUser.username;
    this.currentUser.role = decodedUser.role;
    decodedUser.role === 'admin' ? (this.isAdmin = true) : (this.isAdmin = false);
    delete decodedUser.role;
  }
}
