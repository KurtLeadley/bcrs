/**
 * Title: services/invoice.service.ts
 * Author: Nathaniel Liebhart
 * Description: bcrs
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Invoice } from '../models/invoice.model';
import { Graph } from '../models/graph.model';

const apiUrl = '/api/v1';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private http: HttpClient) {}

  // Invoice CRUD methods
  getInvoices(): Observable<Invoice[]> {
    return this.http.get<{ message: string; invoices: Invoice[] }>(`${apiUrl}/invoices`).pipe(map((x) => x.invoices));
  }

  // tslint:disable-next-line: variable-name
  getInvoice(_id: string): Observable<Invoice> {
    return this.http
      .get<{ message: string; invoice: Invoice }>(`${apiUrl}/invoices/${_id}`)
      .pipe(map((x) => x.invoice));
  }

  getInvoicesByUsername(username: string): Observable<Invoice[]> {
    return this.http
      .get<{ message: string; invoices: Invoice[] }>(`${apiUrl}/invoices/users/${username}`)
      .pipe(map((x) => x.invoices));
  }

  getInvoicesForGraph(): Observable<Graph[]> {
    return this.http.get<{ graph: Graph[] }>(`${apiUrl}/invoices/purchases`).pipe(map((x) => x.graph));
  }

  createInvoice(invoice: Invoice): Observable<string> {
    return this.http
      .post<{ message: string; invoice: Invoice }>(`${apiUrl}/invoices`, invoice)
      .pipe(map((x) => x.message));
  }
}
