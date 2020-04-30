/**
 * Title: pages/admin/users/users.component.ts
 * Authors: Group 4
 * Description: bcrs
 */
import { Component, OnInit, ViewChild, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Invoice } from '../../../models/invoice.model';
import { LineItem } from '../../../models/line-item.model';
import { InvoiceService } from '../../../services/invoice.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-invoices',
  templateUrl: './admin-invoices.component.html',
  styleUrls: ['./admin-invoices.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminInvoicesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<LineItem>>;

  dataSource: MatTableDataSource<Invoice>;
  loading = false;
  invoiceList: Invoice[] = [];
  columnsToDisplay = ['username', 'partsAmount', 'lineItemTotal', 'laborAmount', 'total'];
  innerDisplayedColumns = ['title', 'price'];
  // todo: make dynamic headers below
  // innerDisplayedColumns = [{'data': 'title', 'display': 'Line Item'}, {'data': 'price', 'display': 'Line Item Amount'}];
  expandedElement: Invoice | null;

  constructor(
    public invoiceService: InvoiceService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private cd: ChangeDetectorRef
  ) {}

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

  toggleRow(element: Invoice) {
    console.log(element.lineItems);
    element.lineItems && ((element.lineItems as unknown) as MatTableDataSource<LineItem>)
      ? (this.expandedElement = this.expandedElement === element ? null : element)
      : // tslint:disable-next-line: no-unused-expression
        null;
    this.cd.detectChanges();
  }
  isNumber(e) {return typeof e === 'number'}
}
