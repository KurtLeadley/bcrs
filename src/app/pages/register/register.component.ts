/**
 * Title: pages/register/register.component.ts
 * Authors: Group 4
 * Description: bcrs
 */
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.model';
import { SecurityQuestionService } from '../../services/security-question.service';
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
  // isCollapsed1 = true;
  // isCollapsed2 = true;
  // isCollapsed3 = true;
  sqList: SecurityQuestion[];

  accountFormGroup: FormGroup;
  personalFormGroup: FormGroup;
  secQuestionsFormGroup: FormGroup;

  constructor(
    // tslint:disable-next-line: variable-name
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private sqService: SecurityQuestionService,
    // tslint:disable-next-line: variable-name
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}
  @HostListener('document:mouseover', ['$event'])
  onMouseMove(e) {
    const squares1 = document.getElementById('square1');
    const squares2 = document.getElementById('square2');
    const squares3 = document.getElementById('square3');
    const squares4 = document.getElementById('square4');
    const squares5 = document.getElementById('square5');
    const squares6 = document.getElementById('square6');
    const squares7 = document.getElementById('square7');
    const squares8 = document.getElementById('square8');

    const posX = e.clientX - window.innerWidth / 2;
    const posY = e.clientY - window.innerWidth / 6;

    squares1.style.transform = 'perspective(500px) rotateY(' + posX * 0.05 + 'deg) rotateX(' + posY * -0.05 + 'deg)';
    squares2.style.transform = 'perspective(500px) rotateY(' + posX * 0.05 + 'deg) rotateX(' + posY * -0.05 + 'deg)';
    squares3.style.transform = 'perspective(500px) rotateY(' + posX * 0.05 + 'deg) rotateX(' + posY * -0.05 + 'deg)';
    squares4.style.transform = 'perspective(500px) rotateY(' + posX * 0.05 + 'deg) rotateX(' + posY * -0.05 + 'deg)';
    squares5.style.transform = 'perspective(500px) rotateY(' + posX * 0.05 + 'deg) rotateX(' + posY * -0.05 + 'deg)';
    squares6.style.transform = 'perspective(500px) rotateY(' + posX * 0.05 + 'deg) rotateX(' + posY * -0.05 + 'deg)';
    squares7.style.transform = 'perspective(500px) rotateY(' + posX * 0.02 + 'deg) rotateX(' + posY * -0.02 + 'deg)';
    squares8.style.transform = 'perspective(500px) rotateY(' + posX * 0.02 + 'deg) rotateX(' + posY * -0.02 + 'deg)';
  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('register-page');
    this.loading = true;
    this.sqService.getSecurityQuestions().subscribe((securityQuestionList) => {
      this.sqList = securityQuestionList;

      this.personalFormGroup = this._formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
      });

      this.accountFormGroup = this._formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
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
    if (!this.personalFormGroup.valid || !this.accountFormGroup.valid || !this.secQuestionsFormGroup.valid) {
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
      email: this.personalFormGroup.get('email').value,
      street: this.personalFormGroup.get('street').value,
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

  ngOnDestory() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('register-page');
  }
}
