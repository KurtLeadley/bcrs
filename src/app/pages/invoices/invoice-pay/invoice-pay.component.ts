import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../../../models/invoice.model';
import { User } from '../../../models/user.model';
import { InvoiceService } from '../../../services/invoice.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-invoice-pay',
  templateUrl: './invoice-pay.component.html',
  styleUrls: ['./invoice-pay.component.scss'],
})
export class InvoicePayComponent implements OnInit, OnDestroy {
  user: User;
  invoice: Invoice;

  constructor(
    private invoiceService: InvoiceService,
    private userService: UserService,
    private route: ActivatedRoute
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
    });
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('checkout-page');
  }
}
