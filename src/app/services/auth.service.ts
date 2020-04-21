/**
 * Title: services/auth.service.ts
 * Authors: Group 4
 * Description: bcrs
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { SecurityQuestion } from '../models/security-question.model';
import { SecurityAnswer } from '../models/security-answer.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private timer: any;
  private userObjId: string;
  private currentRole: string;
  private username: string;
  apiUrl = 'http://localhost:5000/api/v1';

  // used to pass along auth info to other components
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  // methods, observables, and subscribers
  getToken() {
    return this.token;
  }

  getUsername() {
    return this.username;
  }

  getCurrentRole() {
    return this.currentRole;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getUserObjId() {
    return this.userObjId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  // Login
  login(username: string, password: string) {
    const user = { username, password };
    this.http
      .post<{
        token: string;
        expiresIn: number;
        userObjId: string;
        username: string;
        role: string;
      }>(this.apiUrl + '/auth/login', user)
      .subscribe((response) => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userObjId = response.userObjId;
          this.currentRole = response.role;
          this.username = response.username;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthDate(token, expirationDate, this.userObjId, this.username, this.currentRole);
        }
        this.router.navigate(['/']);
      });
  }

  // register user
  register(user: User): Observable<string> {
    return this.http
      .post<{ message: string; user: User }>(this.apiUrl + '/auth/register', user)
      .pipe(map((x) => x.message));
  }

  checkIfUsernameExistsObservable(username: string): Observable<boolean> {
    return this.http
      .get<{ userExist: boolean }>(this.apiUrl + '/auth/verify/users/' + username)
      .pipe(map((x) => x.userExist));
  }

  checkIfSecurityAnswersExistsObservable(username: string): Observable<boolean> {
    return this.http
      .get<{ answersExist: boolean }>(this.apiUrl + '/auth/verify/users/' + username + '/security-answers')
      .pipe(map((x) => x.answersExist));
  }

  getUsersSecurityQuestions(username: string): Observable<SecurityQuestion[]> {
    return this.http
      .get<{ message: string; securityQuestions: SecurityQuestion[] }>(
        this.apiUrl + '/auth/users/' + username + '/security-questions'
      )
      .pipe(map((x) => x.securityQuestions));
  }

  verifyUsersSecurityQuestions(username: string, securityAnswers: string[]): Observable<boolean> {
    return this.http
      .post<{ message: string; valid: boolean }>(
        this.apiUrl + '/auth/verify/users/' + username + '/security-answers',
        securityAnswers
      )
      .pipe(map((x) => x.valid));
  }

  resetPassword(username: string, password: string): Observable<string> {
    const pass = {
      password,
    };
    return this.http
      .patch<{ message: string; valid: boolean }>(this.apiUrl + '/auth/verify/' + username + '/reset-password', pass)
      .pipe(map((x) => x.message));
  }

  // allow user to update their profile
  editProfile(userProfile: User): Observable<string> {
    return this.http
      .patch<{ message: string; user: User }>(this.apiUrl + '/auth/updateProfile/' + userProfile._id, userProfile)
      .pipe(map((x) => x.message));
  }

  // logout
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.userObjId = null;
    this.username = null;
    this.authStatusListener.next(false);
    clearTimeout(this.timer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  // Auth helper methods
  private saveAuthDate(token: string, expirationDate: Date, userObjId: string, username: string, currentRole: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userObjId', userObjId);
    localStorage.setItem('username', username);
    localStorage.setItem('role', currentRole);
  }

  // clear local storage vars on logout or timeout
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userObjId');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  }

  // get authenticated user's data from local storage if token matches what's stored
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userObjId = localStorage.getItem('userObjId');
    const username = localStorage.getItem('username');
    const currentRole = localStorage.getItem('role');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userObjId,
      username,
      currentRole,
    };
  }

  // try to automatically authenticate user if they have non-expired token in browser
  autoAuthUser() {
    // auto check localstorage to see if user authenticated
    const authInformation = this.getAuthData(); // get all set local storage vars
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    // if that value is greater than 0, user still has time left to stay logged in
    if (expiresIn > 0) {
      // set vars
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userObjId = authInformation.userObjId;
      this.username = authInformation.username;
      this.currentRole = authInformation.currentRole;

      // force logout after 1 hour
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  // used to automatically log user out after token expiration
  private setAuthTimer(duration: number) {
    this.timer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
}
