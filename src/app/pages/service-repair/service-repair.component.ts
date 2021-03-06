/**
 * Title: pages/service-repair/service-repair.component.ts
 * Authors: Group 4
 * Description: bcrs
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Service } from '../../models/service.model';
import { Invoice } from '../../models/invoice.model';
import { ServiceService } from '../../services/service.service';
import { InvoiceService } from '../../services/invoice.service';

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
  form: FormGroup;
  laborHours = 1;
  message: string;

  constructor(
    private _formBuilder: FormBuilder,
    private sService: ServiceService,
    private invoiceService: InvoiceService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  get f() {
    return this.form && this.form.controls;
  }

  get servicesFormArr(): FormArray {
    return this.f && (this.f.servicesFormArr as FormArray);
  }

  get servicesFormArraySelected(): Service[] {
    return this.serviceList
      .filter((s, sIdx) =>
        this.servicesFormArr.controls.some((control, controlIdx) => sIdx === controlIdx && control.value)
      )
      .map((s) => s);
  }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('product-page');
    const downBtn = document.querySelector('#down');
    const upBtn = document.querySelector('#up');
    downBtn.addEventListener('click', (event) => {
      event.preventDefault();
      this.down();
    });
    upBtn.addEventListener('click', (event) => {
      event.preventDefault();
      this.up();
    });
    this.loading = true;
    this.form = this._formBuilder.group({
      laborHours: new FormControl('', Validators.required),
      parts: new FormControl(''),
      username: new FormControl('', Validators.required),
    });
    this.sService.getServicesDisplay().subscribe((serviceList) => {
      this.serviceList = serviceList;
      this.form.addControl('servicesFormArr', this.buildServicesFormArr(this.serviceList));
    });
    this.loading = false;
  }

  buildServicesFormArr(services: Service[], selectedServiceIds: string[] = []): FormArray {
    const controlArr = this.serviceList.map((service) => {
      const isSelected = selectedServiceIds.some((id) => id === service._id);
      return this._formBuilder.control(isSelected);
    });
    return this._formBuilder.array(controlArr, atLeastOneCheckboxCheckedValidator());
  }

  up() {
    this.laborHours++;
  }
  down() {
    if (this.laborHours > 1) {
      this.laborHours--;
    }
  }

  get filteredList() {
    return this.serviceList.filter(x => x.title === "Password Reset");
  }

  onSubmit() {
    let lineItemTotal = 0.0;
    let laborAmount = 0.0;
    let partsAmount = 0.0;
    let total = 0.0;
    this.servicesFormArraySelected.forEach((element) => {
      lineItemTotal += Number(element.price);
    });
    if (this.form.get('laborHours').value !== '' && this.form.get('laborHours').value != null) {
      laborAmount = Number(this.form.get('laborHours').value * 50);
    }
    if (this.form.get('parts').value !== '' && this.form.get('parts').value != null) {
      partsAmount = Number(this.form.get('parts').value);
    }
    total = lineItemTotal + laborAmount + partsAmount;
    this.invoice = {
      _id: null,
      lineItems: [],
      partsAmount,
      laborAmount,
      lineItemTotal,
      total,
      username: this.form.get('username').value,
      orderDate: this.date,
      disabled: false,
    };
    this.servicesFormArraySelected.forEach((element) => {
      this.invoice.lineItems.push({
        _id: element._id,
        price: Number(element.price),
        title: element.title,
      });
    });
    this.invoiceService.createInvoice(this.invoice).subscribe((message) => {
      this.sendToastMessage(`New invoice created!`);
    });
    this.router.navigate(['/admin/invoices']);
  }

  activateClass(subModule) {
    subModule.touched = !subModule.touched;
  }

  sendToastMessage(message: string) {
    this._snackBar.open(message, 'X', {
      duration: 2000,
    });
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('product-page');
  }
}

function atLeastOneCheckboxCheckedValidator(minRequired = 1): ValidatorFn {
  return function validate(formGroup: FormGroup) {
    let checked = 0;

    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.controls[key];

      if (control.value === true) {
        checked++;
      }
    });

    if (checked < minRequired) {
      return {
        requireCheckboxToBeChecked: true,
      };
    }

    return null;
  };
}
