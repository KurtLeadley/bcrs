/**
 * Title: pages/service-repair/service-repair.component.ts
 * Authors: Group 4
 * Description: bcrs
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Service } from '../../models/service.model';
import { Invoice } from '../../models/invoice.model';
import { ServiceService } from '../../services/service.service';
import { InvoiceService } from '../../services/invoice.service';
import { ServiceRepairDialogComponent } from './service-repair-dialog/service-repair-dialog.component';

@Component({
  selector: 'app-service-repair',
  templateUrl: './service-repair.component.html',
  styleUrls: ['./service-repair.component.scss'],
})
export class ServiceRepairComponent implements OnInit, OnDestroy {
  loading = false;
  serviceList: Service[] = [];
  invoice: Invoice;
  date = new Date();
  repairForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private sService: ServiceService,
    private invoiceService: InvoiceService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  get form() {
    return this.form && this.form.controls;
  }

  get services(): FormArray {
    return this.form && (this.form.services as FormArray);
  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('checkout-page');
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('checkout-page');
  }
}
