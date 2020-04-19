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

  //set up for wizard
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

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
    //listeners
    this.sqService.getSecurityQuestions().subscribe((securityQuestionList) => {
      this.sqList = securityQuestionList;

      //build form for wizard and bind only first & last name to text box
      this.firstFormGroup = this._formBuilder.group({
        username: ['', Validators.required],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
        phoneNumber: ['', [Validators.required]],
      });

      this.secondFormGroup = this._formBuilder.group({
        question1: new FormControl(null),
        answer1: new FormControl(null),
        question2: new FormControl(null),
        answer2: new FormControl(null),
        question3: new FormControl(null),
        answer3: new FormControl(null),
      });

      this.thirdFormGroup = this._formBuilder.group({
        password: ['', Validators.required],
      });

      /**
       *
       * SET UP FOR MUTUALLY EXCLUSIVE DROPDOWNS OF SECURITY QUESTIONS
       *
       */
      this.secondFormGroup.controls['question1'].valueChanges.subscribe((value) => {
        //listener for dd1 selection change
        this.sqList.forEach((element) => {
          //loop each item in array
          if (element._id === value) {
            //if object id in array equal to selected value
            element.tempDisabled = true; //set property ddlDis to true. dropdownlist has disabled attributed binded to ddlDisabled and will gray out option
          } else if (
            this.secondFormGroup.get('question2').value !== element._id &&
            this.secondFormGroup.get('question3').value !== element._id
          ) {
            //if here, element id was not equal to selected value, but still check value is not selected in the other two ddl
            element.tempDisabled = false; //if here, element is not selected in any ddl and should not be grayed out
          }
        });
      });
      this.secondFormGroup.controls['question2'].valueChanges.subscribe((value) => {
        this.sqList.forEach((element) => {
          if (element._id === value) {
            element.tempDisabled = true;
          } else if (
            this.secondFormGroup.get('question1').value !== element._id &&
            this.secondFormGroup.get('question3').value !== element._id
          ) {
            element.tempDisabled = false;
          }
        });
      });
      this.secondFormGroup.controls['question3'].valueChanges.subscribe((value) => {
        this.sqList.forEach((element) => {
          if (element._id === value) {
            element.tempDisabled = true;
          } else if (
            this.secondFormGroup.get('question1').value !== element._id &&
            this.secondFormGroup.get('question2').value !== element._id
          ) {
            element.tempDisabled = false;
          }
        });
      });

      this.loading = false;
    });
  }

  onSubmit() {
    //get reactive forms values
    if (!this.firstFormGroup.valid || !this.secondFormGroup.valid || !this.thirdFormGroup.valid) {
      return;
    }
    const user: User = {
      _id: null,
      username: this.firstFormGroup.get('username').value,
      role: 'standard',
      disabled: false,
      dateCreated: this.date,
      firstName: this.firstFormGroup.get('firstName').value,
      lastName: this.firstFormGroup.get('lastName').value,
      email: this.firstFormGroup.get('email').value,
      street: this.firstFormGroup.get('address').value,
      city: this.firstFormGroup.get('city').value,
      state: this.firstFormGroup.get('state').value,
      zipCode: this.firstFormGroup.get('zipCode').value,
      phoneNumber: this.firstFormGroup.get('phoneNumber').value,
      dateModified: this.date,
      avatar: null,
      securityAnswers: [
        {
          questionId: this.secondFormGroup.get('question1').value,
          answer: this.secondFormGroup.get('answer1').value,
        },
        {
          questionId: this.secondFormGroup.get('question2').value,
          answer: this.secondFormGroup.get('answer2').value,
        },
        {
          questionId: this.secondFormGroup.get('question3').value,
          answer: this.secondFormGroup.get('answer3').value,
        },
      ],
      password: this.thirdFormGroup.get('password').value,
    };

    this.loading = true;

    //send to update method
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
