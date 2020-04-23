/**
 * Title: pages/admin/users/users.component.ts
 * Authors: Group 4
 * Description: bcrs
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Invoice } from '../../../models/invoice.model';
import { InvoiceService } from '../../../services/invoice.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
  dataSource;
  loading = false;
  invoiceList: Invoice[] = [];

  tableColumns: string[] = ['lineItems','partsAmount', 'laborAmount', 'lineItemTotal', 'total'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public invoiceService: InvoiceService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe((invoiceList) => {
      setTimeout(() => {
        this.invoiceList = invoiceList;
        this.dataSource = new MatTableDataSource<Invoice>(invoiceList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      }, 500);
      console.log(invoiceList);
    });
  }

}
