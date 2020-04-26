/**
 * Title: pages/admin/users/users.component.ts
 * Authors: Group 4
 * Description: bcrs
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { UsersDialogComponent } from './users-dialog/users-dialog.component';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  dataSource;
  loading = false;
  userList: User[] = [];

  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'email', 'disabled', 'role', 'action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public userService: UserService, public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loading = true;
    this.userService.getUsers().subscribe((userList) => {
      setTimeout(() => {
        this.userList = userList;
        this.dataSource = new MatTableDataSource<User>(userList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      }, 500);
    });
  }

  applyFilter(event: Event) {
    //filter table rows by column
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action, obj): void {
    //modal for edit, delete, create, archive, assign users
    if (obj === null) {
      obj = this.userList;
    }

    const dialogRef = this.dialog.open(UsersDialogComponent, {
      width: '750px',
      data: { action: action, obj: obj }, //pass row data
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.userService.getUsers().subscribe((userList) => {
        this.userList = userList;
        this.dataSource = new MatTableDataSource<User>(userList); //set datasource of table
        this.dataSource.paginator = this.paginator; //set to current dataset
        this.dataSource.sort = this.sort;
        this.loading = false;
      });
    });
  }
}
