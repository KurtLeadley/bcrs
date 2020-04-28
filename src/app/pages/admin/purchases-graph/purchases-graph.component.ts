import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InvoiceService } from '../../../services/invoice.service';

@Component({
  selector: 'app-purchases-graph',
  templateUrl: './purchases-graph.component.html',
  styleUrls: ['./purchases-graph.component.scss'],
})
export class PurchasesGraphComponent implements OnInit {
  loading = false;
  invoices: any;
  data: any;
  options: any;
  labels;
  passwordReset = 0;
  spywareRemoval = 0;
  ramUpgrade = 0;
  tuneup = 0;
  keyboardCleaning = 0;
  softwareInstallation = 0;
  discCleanup = 0;

  polarArea: any;
  doughnut: any;
  barChart: any;

  @ViewChild('polarAreaCanvas') polarAreaCanvas: ElementRef;
  @ViewChild('doughnutCanvas') doughnutCanvas: ElementRef;
  @ViewChild('barCanvas') barCanvas: ElementRef;

  public ctx: CanvasRenderingContext2D;

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit() {
    this.invoiceService.getInvoices().subscribe((res) => {
      this.loading = true;
      this.invoices = res;

      const tempLabels = [];
      // Get labels and save them to a temp variable
      for (const item of this.invoices) {
        item.lineItems.forEach((e) => {
          tempLabels.push(e.title);
        });
      }

      this.labels = tempLabels.filter((item, index) => {
        return tempLabels.indexOf(item) === index;
      });

      // Get data for graph - this is not scalable without adding new services to this switch statement
      for (const item of this.invoices) {
        item.lineItems.forEach((e) => {
          switch (e.title) {
            case 'Password Reset':
              this.passwordReset += 1;
              break;
            case 'Spyware Removal':
              this.spywareRemoval += 1;
              break;
            case 'RAM Upgrade':
              this.ramUpgrade += 1;
              break;
            case 'Software Installation':
              this.softwareInstallation += 1;
              break;
            case 'PC Tune-up':
              this.tuneup += 1;
              break;
            case 'Keyboard Cleaning':
              this.keyboardCleaning += 1;
              break;
            case 'Disk Clean-up':
              this.discCleanup += 1;
              break;
            default:
              console.log('Line item title does not match a service');
              break;
          }
        });

        // Polar Area
        this.polarArea = {
          labels: this.labels,
          datasets: [
            {
              label: 'Services',
              data: [
                this.passwordReset.toFixed(1),
                this.spywareRemoval.toFixed(1),
                this.ramUpgrade.toFixed(1),
                this.tuneup.toFixed(1),
                this.keyboardCleaning.toFixed(1),
                this.softwareInstallation.toFixed(1),
                this.discCleanup.toFixed(1),
              ],
              backgroundColor: ['#344675', '#e14eca', '#00f2c3', '#1d8cf8', '#ff8d72', '#fd5d93', '#ba54f5'],
            },
          ],
        };

        // Doughnut Chart
        this.doughnut = {
          labels: this.labels,
          datasets: [
            {
              label: 'Services',
              data: [
                this.passwordReset.toFixed(1),
                this.spywareRemoval.toFixed(1),
                this.ramUpgrade.toFixed(1),
                this.tuneup.toFixed(1),
                this.keyboardCleaning.toFixed(1),
                this.softwareInstallation.toFixed(1),
                this.discCleanup.toFixed(1),
              ],
              backgroundColor: ['#344675', '#e14eca', '#00f2c3', '#1d8cf8', '#ff8d72', '#fd5d93', '#ba54f5'],
            },
          ],
        };

        // Bar Chart
        this.barChart = {
          labels: this.labels,
          datasets: [
            {
              label: 'Services',
              data: [
                this.passwordReset.toFixed(1),
                this.spywareRemoval.toFixed(1),
                this.ramUpgrade.toFixed(1),
                this.tuneup.toFixed(1),
                this.keyboardCleaning.toFixed(1),
                this.softwareInstallation.toFixed(1),
                this.discCleanup.toFixed(1),
              ],
              backgroundColor: ['#344675', '#e14eca', '#00f2c3', '#1d8cf8', '#ff8d72', '#fd5d93', '#ba54f5'],
            },
          ],
        };

        this.loading = false;
      }
    });
  }
}
