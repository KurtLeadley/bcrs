/**
 * Title: pages/admin/users/users.component.ts
 * Authors: Group 4
 * Description: bcrs
 */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Invoice } from '../../models/invoice.model';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent implements OnInit {
  loading = false;
  invoiceList: Invoice[];
  username: string;
  isCollapsed = true;

  constructor(public invoiceService: InvoiceService, public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.invoiceService.getInvoices().subscribe((invoiceList) => {
      setTimeout(() => {
        this.invoiceList = invoiceList;
        this.loading = false;
      }, 500);
    });
  }
}
