/**
 * Title: pages/security-questions/security-questions.component.ts
 * Author: Nathaniel Liebhart
 * Description: bcrs
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { SecurityQuestion } from '../../../models/security-question.model';
import { SecurityQuestionService } from '../../../services/security-question.service';
import { SecurityQuestionsDialogComponent } from './security-questions-dialog/security-questions-dialog.component';

@Component({
  selector: 'app-security-questions',
  templateUrl: './security-questions.component.html',
  styleUrls: ['./security-questions.component.scss'],
})
export class SecurityQuestionsComponent implements OnInit {
  dataSource;
  loading = false;
  securityQuestions: SecurityQuestion[] = [];

  displayedColumns: string[] = ['text', 'disabled', 'action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public sqService: SecurityQuestionService,
    public dialog: MatDialog,
    // tslint:disable-next-line: variable-name
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.sqService.getSecurityQuestions().subscribe((securityQuestionList) => {
      setTimeout(() => {
        this.securityQuestions = securityQuestionList;
        this.dataSource = new MatTableDataSource<SecurityQuestion>(this.securityQuestions);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      }, 500);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action, obj): void {
    if (obj === null) {
      obj = this.securityQuestions;
    }
    const dialogRef = this.dialog.open(SecurityQuestionsDialogComponent, {
      width: '750px',
      data: { action, obj },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.sqService.getSecurityQuestions().subscribe((securityQusetionList) => {
        setTimeout(() => {
          this.securityQuestions = securityQusetionList;
          this.dataSource = new MatTableDataSource<SecurityQuestion>(securityQusetionList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.loading = false;
        }, 500);
      });
    });
  }
}
