import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Invoice } from '../../../../models/invoice.model';
import { InvoiceService } from '../../../../services/invoice.service';
import { brotliCompressSync } from 'zlib';

@Component({
  selector: 'app-view-invoice-dialog',
  templateUrl: './view-invoice-dialog.component.html',
  styleUrls: ['./view-invoice-dialog.component.scss'],
})
export class ViewInvoiceDialogComponent implements OnInit, OnDestroy {
  loading = false;
  invoice: Invoice;

  constructor(
    public dialogRef: MatDialogRef<ViewInvoiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: String; obj: Invoice },
    private invoiceService: InvoiceService
  ) {}

  print() {
    window.print();
  }

  onNoClick() {
    this.dialogRef.close();
  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('invoice-page');
    console.log(this.data.obj);
    this.invoiceService.getInvoice(this.data.obj._id).subscribe((invoice) => {
      this.invoice = invoice;
    });
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('invoice-page');
  }
}
