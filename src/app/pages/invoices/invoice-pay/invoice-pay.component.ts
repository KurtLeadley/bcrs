import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Invoice } from '../../../models/invoice.model';
import { User } from '../../../models/user.model';
import { InvoiceService } from '../../../services/invoice.service';
import { UserService } from '../../../services/user.service';
import { StripeService } from '../../../services/stripe.service';

@Component({
  selector: 'app-invoice-pay',
  templateUrl: './invoice-pay.component.html',
  styleUrls: ['./invoice-pay.component.scss'],
})
export class InvoicePayComponent implements OnInit, OnDestroy {
  user: User;
  invoice: Invoice;
  // Amount to charge
  invoiceTotal: number;
  // Stripe handler
  handler: any;
  // Show payment results
  showResultScreen: boolean;
  paymentResult: boolean;
  message: string;

  constructor(
    private invoiceService: InvoiceService,
    private userService: UserService,
    private route: ActivatedRoute,
    private stripe: StripeService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('checkout-page');
    const username = localStorage.getItem('username');
    const invoiceId = this.route.snapshot.paramMap.get('invoiceId');
    this.userService.getUserByUsername(username).subscribe((user) => {
      this.user = user;
    });
    this.invoiceService.getInvoice(invoiceId).subscribe((invoice) => {
      this.invoice = invoice;
      this.invoiceTotal = invoice.total;
    });

    // Configure Stripe checkout
    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: 'assets/img/bcrs-3D-logo.png',
      locale: 'auto',
      token: (stripeToken) => {
        this.stripe.sendToken(this.invoiceTotal, stripeToken).subscribe((data: any) => {
          // Get JSON response from server
          this.paymentResult = data.success;
          this.message = data.message;
          // Show payment results screen
          this.showResultScreen = true;
          setTimeout(() => {
            this.showResultScreen = false;
            this.invoiceService.payInvoice(this.invoice).subscribe((message) => {
              this.sendToastMessage(message);
            });
          }, 5000);
        });
      },
    });
  }

  checkOut() {
    this.handler.open({
      name: 'BCRS Invoice Payment',
      description: `Invoice Payment: Invoice #${this.invoice._id}`,
      amount: this.invoiceTotal * 100,
    });
  }

  sendToastMessage(message: string) {
    this._snackBar.open(message, 'X', {
      duration: 2000,
    });
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('checkout-page');
  }
}
