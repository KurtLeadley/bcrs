import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MAT_DIALOG_SCROLL_STRATEGY } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Service } from '../../../models/service.model';
import { ServiceService } from '../../../services/service.service';
import { ServicesDialogComponent } from './services-dialog/services-dialog.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit, OnDestroy {
  loading = false;
  serviceList: Service[] = [];

  constructor(public sService: ServiceService, public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('index-page');
    this.loading = true;
    this.sService.getServices().subscribe((serviceList) => {
      setTimeout(() => {
        this.serviceList = serviceList;
        this.loading = false;
        console.log(serviceList);
      }, 500);
    });
  }

  openDialog(action, obj) {
    if (obj === null) {
      obj = this.serviceList;
    }

    const dialogRef = this.dialog.open(ServicesDialogComponent, {
      width: '750px',
      data: { action, obj },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loading = true;
      this.sService.getServices().subscribe((serviceList) => {
        setTimeout(() => {
          this.serviceList = serviceList;
          this.loading = false;
        }, 500);
      });
    });
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('index-page');
  }
}
