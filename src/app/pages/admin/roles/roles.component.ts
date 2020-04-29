/**
 * Title: pages/admin/roles/roles.component.ts
 * Authors: Group 4
 * Description: bcrs
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Role } from '../../../models/role.model';
import { RoleService } from '../../../services/role.service';
import { RolesDialogComponent } from './roles-dialog/roles-dialog.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit, OnDestroy {
  loading = false;
  roleList: Role[] = [];

  constructor(public roleService: RoleService, public dialog: MatDialog) {}

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('index-page');
    this.loading = true;
    this.roleService.getRoles().subscribe((roleList) => {
      setTimeout(() => {
        this.roleList = roleList;
        this.loading = false;
      }, 500);
    });
  }

  openDialog(action, obj) {
    if (obj === null) {
      obj = this.roleList;
    }

    const dialogRef = this.dialog.open(RolesDialogComponent, {
      width: '750px',
      data: { action, obj },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.roleService.getRoles().subscribe((roleList) => {
        setTimeout(() => {
          this.loading = true;
          this.roleList = roleList;
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
