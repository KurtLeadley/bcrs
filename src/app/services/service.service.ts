/**
 * Title: services/service.service.ts
 * Author: Nathaniel Liebhart
 * Description: bcrs
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Service } from '../models/service.model';

const apiUrl = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  // Service CRUD methods
  getServices(): Observable<Service[]> {
    return this.http.get<{ message: string; services: Service[] }>(`${apiUrl}/services`).pipe(map((x) => x.services));
  }

  // tslint:disable-next-line: variable-name
  getService(_id: string): Observable<Service> {
    return this.http
      .get<{ message: string; service: Service }>(`${apiUrl}/services/` + _id)
      .pipe(map((x) => x.service));
  }

  createService(service: Service): Observable<string> {
    return this.http
      .post<{ message: string; service: Service }>(`${apiUrl}/services`, service)
      .pipe(map((x) => x.message));
  }

  updateService(service: Service): Observable<string> {
    return this.http
      .put<{ message: string; service: Service }>(`${apiUrl}/services/` + service._id, service)
      .pipe(map((x) => x.message));
  }

  deleteService(service: Service): Observable<string> {
    return this.http
      .delete<{ message: string; service: Service }>(`${apiUrl}/services/` + service._id)
      .pipe(map((x) => x.message));
  }
}
