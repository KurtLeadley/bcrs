/**
 * Title: service/user.service.ts
 * Authors: Group 4
 * Description: bcrs
 */
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'http://localhost:5000/api/v1';

  constructor(private http: HttpClient) {}

  // User CRUD methods
  getUsers(): Observable<User[]> {
    return this.http.get<{ message: String; users: User[] }>(this.apiUrl + '/users').pipe(map((x) => x.users));
  }

  getUser(_id: string): Observable<User> {
    return this.http.get<{ message: String; user: User }>(this.apiUrl + '/users/' + _id).pipe(map((x) => x.user));
  }

  createUser(user: User): Observable<string> {
    return this.http.post<{ message: string; user: User }>(this.apiUrl + '/users', user).pipe(map((x) => x.message));
  }

  updateUser(user: User): Observable<string> {
    return this.http
      .put<{ message: string; user: User }>(this.apiUrl + '/users/' + user._id, user)
      .pipe(map((x) => x.message));
  }

  deleteUser(user: User): Observable<string> {
    return this.http
      .delete<{ message: string; user: User }>(this.apiUrl + '/users/' + user._id)
      .pipe(map((x) => x.message));
  }
}
