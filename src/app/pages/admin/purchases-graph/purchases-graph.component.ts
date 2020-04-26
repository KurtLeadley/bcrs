import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InvoiceService } from '../../../services/invoice.service';
import { ServiceService } from '../../../services/service.service';
import { Invoice } from '../../../models/invoice.model';
import { LineItem } from '../../../models/line-item.model';
import { Service } from '../../../models/service.model';

@Component({
  selector: 'app-purchases-graph',
  templateUrl: './purchases-graph.component.html',
  styleUrls: ['./purchases-graph.component.scss'],
})
export class PurchasesGraphComponent implements OnInit {
  invoices: any;
  data: any;
  options: any;
  labels;
  services;
  passwordReset = 0;
  spywareRemoval = 0;
  ramUpgrade = 0;
  tuneup = 0;
  keyboardCleaning = 0;
  softwareInstallation = 0;
  discCleanup = 0;

  constructor(private invoiceService: InvoiceService, private sService: ServiceService) {}

  ngOnInit() {
    this.sService.getServices().subscribe((res) => {
      this.services = res;
    });
    this.invoiceService.getInvoices().subscribe((res) => {
      this.invoices = res;

      const tempLabels = [];
      const graphData = {};

      for (const item of this.invoices) {
        item.lineItems.forEach((e) => {
          tempLabels.push(e.title);
        });
      }
      console.log(tempLabels);
    });
  }
}
