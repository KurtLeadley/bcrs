/**
 * Title: pages/admin/users/users.component.ts
 * Authors: Group 4
 * Description: bcrs
 */
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Invoice } from '../../models/invoice.model';
import { LineItem } from '../../models/line-item.model';
import { InvoiceService } from '../../services/invoice.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InvoicesComponent implements OnInit {
  loading = false;
  invoiceList: Invoice[];
  username: string;
  hide = false;

  constructor(public invoiceService: InvoiceService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    console.log(this.username);
    this.invoiceService.getInvoices().subscribe((invoiceList) => {
      setTimeout(() => {
        this.invoiceList = invoiceList;
        this.loading = false;
      }, 500);
      console.log(invoiceList);
    });
  }
}
