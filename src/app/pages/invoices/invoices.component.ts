/**
 * Title: pages/invoices/invoices.component.ts
 * Authors: Group 4
 * Desription: bcrs
 */
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import { Invoice } from '../../models/invoice.model';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent implements OnInit {
  loading = false;
  invoiceList: Invoice[] = [];

  displayedRows$: Observable<Invoice[]>;
  totalRow$: Observable<number>;

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit() {
    this.loading = true;
    this.invoiceService.getInvoicesByUsername(localStorage.getItem('username')).subscribe((invoiceList) => {
      setTimeout(() => {
        const rows$ = of(invoiceList);
        this.totalRow$ = rows$.pipe(map((rows) => rows.length));
        this.displayedRows$ = rows$;
        this.loading = false;
      }, 500);
    });
  }
}
