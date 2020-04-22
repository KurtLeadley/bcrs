/**
 * Title: pages/forgot-password/forgot-password.component.ts
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { SecurityQuestionService } from '../../services/security-question.service';
import { SecurityQuestion } from '../../models/security-question.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  loading = false;
  isLinear = true;
  date = new Date();
  sqList: SecurityQuestion[];
  username = '';
  securityAnswers = [];
  usernameExists = false;
  securityQuestionsCorrect = false;
  private authServiceSubscription: Subscription;
  hide: boolean;

  usernameFormGroup: FormGroup;
  questionsFormGroup: FormGroup;
  passwordFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private auth: AuthService,
    private userService: UserService,
    private questionServie: SecurityQuestionService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.usernameFormGroup = this._formBuilder.group({
      username: ['', Validators.required],
    });
    this.questionsFormGroup = this._formBuilder.group({
      question1: new FormControl(null),
      answer1: new FormControl(null),
      question2: new FormControl(null),
      answer2: new FormControl(null),
      question3: new FormControl(null),
      answer3: new FormControl(null),
    });
    this.passwordFormGroup = this._formBuilder.group({
      password: ['', Validators.required],
    });
  }

  onCheckUsername(stepper: MatStepper) {
    if (this.usernameFormGroup.invalid) {
      return;
    }
    this.loading = true;
    this.username = this.usernameFormGroup.get('username').value;
    console.log(this.username);
    this.authServiceSubscription = this.auth.checkIfUsernameExistsObservable(this.username).subscribe((response) => {
      this.usernameExists = response;
      console.log(this.usernameExists);
      if (response === true) {
        this.auth.getUsersSecurityQuestions(this.username).subscribe((securityQuestions) => {
          let i = 1;
          this.sqList = securityQuestions;
          securityQuestions.forEach((element) => {
            this.questionsFormGroup.controls['question' + i].setValue(element[0].text, [Validators.required]);
            i++;
          });
          stepper.next();
        });
      }
      this.loading = false;
    });
  }

  onCheckSecurityAnswers(stepper: MatStepper) {
    if (this.questionsFormGroup.invalid) {
      return;
    }
    this.loading = true;
    this.securityAnswers = [
      this.questionsFormGroup.get('answer1').value,
      this.questionsFormGroup.get('answer2').value,
      this.questionsFormGroup.get('answer3').value,
    ];
    this.auth.verifyUsersSecurityQuestions(this.username, this.securityAnswers).subscribe((valid) => {
      this.securityQuestionsCorrect = valid;
      if (valid === true) {
        stepper.next();
      } else {
        this.questionsFormGroup.setErrors({ error: 'There are incorrect security answers.' });
      }
      this.loading = false;
    });
  }

  onChangePassword() {
    if (this.passwordFormGroup.invalid) {
      return;
    }
    this.loading = true;
    this.auth.resetPassword(this.username, this.passwordFormGroup.get('password').value).subscribe((message) => {
      this._snackBar.open(message, 'X', {
        duration: 2000,
      });
    });

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }

  ngOnDestroy() {}
}
