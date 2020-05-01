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
import { Graph } from '../models/graph.model';

const apiUrl = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  constructor(private http: HttpClient) {}

  // Service CRUD methods
  getGraph(): Observable<Graph[]> {
    return this.http.get<{ message: string; graph: Graph[] }>(`${apiUrl}/graph`).pipe(map((x) => x.graph));
  }
}
