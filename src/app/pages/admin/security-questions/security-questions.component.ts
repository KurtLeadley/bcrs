/**
 * Title: pages/security-questions/security-questions.component.ts
 * Author: Nathaniel Liebhart
 * Description: bcrs
 */
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SecurityQuestion } from '../../../models/security-question.model';
import { SecurityQuestionService } from '../../../services/security-question.service';
import { SecurityQuestionsDialogComponent } from './security-questions-dialog/security-questions-dialog.component';

@Component({
  selector: 'app-security-questions',
  templateUrl: './security-questions.component.html',
  styleUrls: ['./security-questions.component.scss'],
})
export class SecurityQuestionsComponent implements OnInit, OnDestroy {
  dataSource;
  loading = false;
  securityQuestions: SecurityQuestion[] = [];

  constructor(
    public sqService: SecurityQuestionService,
    public dialog: MatDialog,
    // tslint:disable-next-line: variable-name
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('index-page');
    this.loading = true;
    this.sqService.getSecurityQuestions().subscribe((securityQuestionList) => {
      setTimeout(() => {
        this.securityQuestions = securityQuestionList;
        this.loading = false;
      }, 500);
    });
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
