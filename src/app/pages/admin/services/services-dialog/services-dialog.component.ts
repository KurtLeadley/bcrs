/**
 * Title: pages/admin/services/services-dialog/services-dialog.component.ts
 * Authors: Group 4
 * Description: bcrs
 */
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Service } from '../../../../models/service.model';
import { ServiceService } from '../../../../services/service.service';

@Component({
  selector: 'app-services-dialog',
  templateUrl: './services-dialog.component.html',
  styleUrls: ['./services-dialog.component.scss'],
})
export class ServicesDialogComponent implements OnInit, OnDestroy {
  loading = false;
  serviceForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ServicesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: String; obj: Service },
    public sService: ServiceService,
    private formBuild: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('index-page');
    this.serviceForm = this.formBuild.group({
      action: new FormControl(this.data.action),
      _id: new FormControl(this.data.obj._id),
      title: new FormControl(this.data.obj.title, Validators.required),
      price: new FormControl(this.data.obj.price, Validators.required),
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.serviceForm.invalid) {
      return;
    }

    this.loading = true;
    const action = this.serviceForm.controls.action.value;

    const service: Service = {
      _id: this.serviceForm.controls._id.value,
      title: this.serviceForm.controls.title.value,
      price: this.serviceForm.controls.price.value,
    };

    setTimeout(() => {
      switch (action) {
        case 'Create':
          this.sService.createService(service).subscribe((message) => {
            this.sendToastMessage(message);
          });
          break;
        case 'Update':
          this.sService.updateService(service).subscribe((message) => {
            this.sendToastMessage(message);
          });
          break;
        case 'Delete':
          this.sService.deleteService(service).subscribe((message) => {
            this.sendToastMessage(message);
          });
          break;
        default:
          this.router.navigate(['/error/500']);
          break;
      }

      this.loading = false;
      this.dialogRef.close();
    }, 1000);
  }

  sendToastMessage(message: string) {
    this._snackBar.open(message, 'X', {
      duration: 2000,
    });
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('index-page');
  }
}
