/**
 * Title: pages/admin/users/users.component.ts
 * Authors: Group 4
 * Description: bcrs
 */
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersDialogComponent } from './users-dialog/users-dialog.component';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  loading = false;
  userList: User[] = [];

  constructor(public userService: UserService, public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('index-page');
    this.loading = true;
    this.userService.getUsers().subscribe((userList) => {
      setTimeout(() => {
        this.userList = userList;
        this.loading = false;
      }, 500);
    });
  }

  openDialog(action, obj): void {
    // modal for edit, delete, create, archive, assign users
    if (obj === null) {
      obj = this.userList;
    }

    const dialogRef = this.dialog.open(UsersDialogComponent, {
      width: '750px',
      data: { action, obj }, //pass row data
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.userService.getUsers().subscribe((userList) => {
        this.userList = userList;
        this.loading = false;
      });
    });
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('index-page');
  }
}
