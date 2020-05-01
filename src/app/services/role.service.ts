/**
 * Title: services/role.service.ts
 * Authors: Group 4
 * Description: bcrs
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  apiUrl = '/api/v1';

  constructor(private http: HttpClient) {}

  // Role CRUD methods
  getRoles(): Observable<Role[]> {
    return this.http.get<{ message: string; roles: Role[] }>(this.apiUrl + '/roles').pipe(map((x) => x.roles));
  }

  getRole(_id: string): Observable<Role> {
    return this.http.get<{ message: string; role: Role }>(this.apiUrl + '/roles/' + _id).pipe(map((x) => x.role));
  }

  createRole(role: Role): Observable<Role> {
    return this.http.post<{ message: string; role: Role }>(this.apiUrl + '/roles', role).pipe(map((x) => x.role));
  }

  updateRole(role: Role): Observable<Role> {
    return this.http
      .put<{ message: string; role: Role }>(this.apiUrl + '/roles/' + role._id, role)
      .pipe(map((x) => x.role));
  }

  deleteRole(role: Role): Observable<Role> {
    return this.http
      .delete<{ message: string; role: Role }>(this.apiUrl + '/roles/' + role._id)
      .pipe(map((x) => x.role));
  }
}
