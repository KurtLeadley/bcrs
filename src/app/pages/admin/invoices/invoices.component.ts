/**
 * Title: pages/admin/users/users.component.ts
 * Authors: Group 4
 * Description: bcrs
 */
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Invoice } from '../../../models/invoice.model';
import { InvoiceService } from '../../../services/invoice.service';
import { ViewInvoiceDialogComponent } from './view-invoice-dialog/view-invoice-dialog.component';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent implements OnInit, OnDestroy {
  loading = false;
  invoiceList: Invoice[] = [];

  constructor(public invoiceService: InvoiceService, public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('index-page');
    this.loading = true;
    this.invoiceService.getInvoices().subscribe((invoiceList) => {
      setTimeout(() => {
        this.invoiceList = invoiceList;
        this.loading = false;
      }, 500);
      console.log(invoiceList);
    });
  }

  openViewDialog(action, obj) {
    // modal for viewing and printing dialog
    const dialogRef = this.dialog.open(ViewInvoiceDialogComponent, {
      width: '950px',
      data: { action: action, obj: obj },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.invoiceService.getInvoices().subscribe((invoiceList) => {
        this.invoiceList = invoiceList;
        this.loading = false;
      });
    });
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('index-page');
  }
}
