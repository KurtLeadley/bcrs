/**
 * Title: pages/admin/security-questions/security-questions-dialog.ts
 * Author: Nathaniel Liebhart
 * Description: bcrs
 */
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SecurityQuestion } from '../../../../models/security-question.model';
import { SecurityQuestionService } from '../../../../services/security-question.service';

@Component({
  selector: 'app-security-questions-dialog',
  templateUrl: './security-questions-dialog.component.html',
  styleUrls: ['./security-questions-dialog.component.scss'],
})
export class SecurityQuestionsDialogComponent implements OnInit, OnDestroy {
  loading = false;
  date = new Date();
  securityQuestionForm: FormGroup;
  private messageSubscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<SecurityQuestionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: string; obj: SecurityQuestion },
    public sqService: SecurityQuestionService,
    private formBuilder: FormBuilder,
    // tslint:disable-next-line: variable-name
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('index-page');
    this.securityQuestionForm = this.formBuilder.group({
      action: new FormControl(this.data.action),
      _id: new FormControl(this.data.obj._id),
      text: new FormControl(this.data.obj.text, Validators.required),
      disabled: new FormControl(this.data.obj.disabled),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave() {
    if (this.securityQuestionForm.invalid) {
      return;
    }

    this.loading = true;
    const action = this.securityQuestionForm.controls.action.value;

    const securityQuestion: SecurityQuestion = {
      _id: this.securityQuestionForm.controls._id.value,
      text: this.securityQuestionForm.controls.text.value,
      disabled: this.securityQuestionForm.controls.disabled.value,
      tempDisabled: false,
    };

    setTimeout(() => {
      if (action === 'Add') {
        this.sqService.createSecurityQuestion(securityQuestion).subscribe((message) => {
          this.sendToastMessage(message);
        });
      } else if (action === 'Update') {
        this.sqService.updateSecurityQuestion(securityQuestion).subscribe((message) => {
          this.sendToastMessage(message);
        });
      } else if (action === 'Disable') {
        if (securityQuestion.disabled === false) {
          securityQuestion.disabled = true;
        } else {
          securityQuestion.disabled = false;
        }
        this.sqService.deleteSecurityQuestion(securityQuestion).subscribe((message) => {
          this.sendToastMessage(message);
        });
      }

      this.loading = false;
      // close dialog
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
