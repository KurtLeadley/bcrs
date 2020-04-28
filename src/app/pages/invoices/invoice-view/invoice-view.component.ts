import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../../../models/invoice.model';
import { LineItem } from '../../../models/line-item.model';
import { User } from '../../../models/user.model';
import { InvoiceService } from '../../../services/invoice.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss'],
})
export class InvoiceViewComponent implements OnInit, OnDestroy {
  invoice: Invoice;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private userService: UserService
  ) {}

  print() {
    window.print();
  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('invoice-page');
    // tslint:disable-next-line: radix
    const invoiceId = this.route.snapshot.paramMap.get('invoiceId');
    const username = localStorage.getItem('username');
    this.userService.getUserByUsername(username).subscribe((user) => {
      this.user = user;
    });
    // tslint:disable-next-line: no-shadowed-variable
    this.invoiceService.getInvoice(invoiceId).subscribe((invoice) => {
      this.invoice = invoice;
    });
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('invoice-page');
  }
}
