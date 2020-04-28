/**
 * Title: pages/service-repair/service-repair-dialog/service-repair-dialog.component.ts
 * Authors: Group 4
 * Description: bcrs
 */
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invoice } from '../../../models/invoice.model';

@Component({
  selector: 'app-service-repair-dialog',
  templateUrl: './service-repair-dialog.component.html',
  styleUrls: ['./service-repair-dialog.component.scss'],
})
export class ServiceRepairDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ServiceRepairDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: String; obj: any }
  ) {}

  ngOnInit() {}
}
