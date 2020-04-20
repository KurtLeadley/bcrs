/**
 * Title: pages/register/register.component.ts
 * Authors: Group 4
 * Description: bcrs
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.model';
import { SecurityQuestionService } from '../../services/security-questiion.service';
import { SecurityQuestion } from 'src/app/models/security-question.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  loading = false;
  usernameCheckSpinner = false;
  isLinear = true;
  date = new Date();
  cPasshide: boolean;
  hide: boolean;
  sqList: SecurityQuestion[];

  accountFormGroup: FormGroup;
  personalFormGroup: FormGroup;
  secQuestionsFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private sqService: SecurityQuestionService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.sqService.getSecurityQuestions().subscribe((securityQuestionList) => {
      this.sqList = securityQuestionList;

      this.accountFormGroup = this._formBuilder.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      });

      this.personalFormGroup = this._formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
        phoneNumber: ['', [Validators.required]],
      });

      this.secQuestionsFormGroup = this._formBuilder.group({
        question1: new FormControl(null),
        answer1: new FormControl(null),
        question2: new FormControl(null),
        answer2: new FormControl(null),
        question3: new FormControl(null),
        answer3: new FormControl(null),
      });

      this.secQuestionsFormGroup.controls.question1.valueChanges.subscribe((value) => {
        this.sqList.forEach((element) => {
          if (element._id === value) {
            element.tempDisabled = true;
          } else if (
            this.secQuestionsFormGroup.get('question2').value !== element._id &&
            this.secQuestionsFormGroup.get('question3').value !== element._id
          ) {
            element.tempDisabled = false;
          }
        });
      });
      this.secQuestionsFormGroup.controls.question2.valueChanges.subscribe((value) => {
        this.sqList.forEach((element) => {
          if (element._id === value) {
            element.tempDisabled = true;
          } else if (
            this.secQuestionsFormGroup.get('question1').value !== element._id &&
            this.secQuestionsFormGroup.get('question3').value !== element._id
          ) {
            element.tempDisabled = false;
          }
        });
      });
      this.secQuestionsFormGroup.controls.question3.valueChanges.subscribe((value) => {
        this.sqList.forEach((element) => {
          if (element._id === value) {
            element.tempDisabled = true;
          } else if (
            this.secQuestionsFormGroup.get('question1').value !== element._id &&
            this.secQuestionsFormGroup.get('question2').value !== element._id
          ) {
            element.tempDisabled = false;
          }
        });
      });

      this.loading = false;
    });
  }

  onSubmit() {
    if (!this.accountFormGroup.valid || !this.personalFormGroup.valid || !this.secQuestionsFormGroup.valid) {
      return;
    }
    const user: User = {
      _id: null,
      username: this.accountFormGroup.get('username').value,
      role: 'standard',
      disabled: false,
      dateCreated: this.date,
      firstName: this.personalFormGroup.get('firstName').value,
      lastName: this.personalFormGroup.get('lastName').value,
      email: this.accountFormGroup.get('email').value,
      street: this.personalFormGroup.get('address').value,
      city: this.personalFormGroup.get('city').value,
      state: this.personalFormGroup.get('state').value,
      zipCode: this.personalFormGroup.get('zipCode').value,
      phoneNumber: this.personalFormGroup.get('phoneNumber').value,
      dateModified: this.date,
      avatar: null,
      securityAnswers: [
        {
          questionId: this.secQuestionsFormGroup.get('question1').value,
          answer: this.secQuestionsFormGroup.get('answer1').value,
        },
        {
          questionId: this.secQuestionsFormGroup.get('question2').value,
          answer: this.secQuestionsFormGroup.get('answer2').value,
        },
        {
          questionId: this.secQuestionsFormGroup.get('question3').value,
          answer: this.secQuestionsFormGroup.get('answer3').value,
        },
      ],
      password: this.accountFormGroup.get('password').value,
    };

    this.loading = true;

    this.authService.register(user).subscribe((message) => {
      this._snackBar.open(message, 'x', {
        duration: 2000,
      });
    });

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }
}
