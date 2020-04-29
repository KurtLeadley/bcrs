import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../models/user.model';
import { SecurityQuestion } from '../../models/security-question.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { SecurityQuestionService } from '../../services/security-question.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  loading = false;
  userObjId = '';
  user: User;
  firstName: string;
  lastName: string;
  date = new Date();
  hide: boolean;
  alreadyUploaded = false;
  imageURL: string;
  imageName = '';
  imageTooLarge = false;
  incorrectImageType = false;
  sqList: SecurityQuestion[] = [];
  // forms
  uploadForm: FormGroup;
  profileForm: FormGroup;
  secQuestionsForm: FormGroup;
  passwordForm: FormGroup;

  constructor(
    private _snackBar: MatSnackBar,
    public auth: AuthService,
    public userService: UserService,
    public sqService: SecurityQuestionService,
    private _formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('account-settings');
    this.loading = true;
    // avatar form
    this.uploadForm = this._formBuilder.group({
      avatar: [null, Validators.required],
    });

    this.userObjId = this.auth.getUserObjId();

    this.sqService.getSecurityQuestions().subscribe((sqList) => {
      this.userService.getUser(this.userObjId).subscribe((user) => {
        this.user = user;
        this.sqList = sqList;

        if (user.avatar !== null && user.avatar !== undefined) {
          this.alreadyUploaded = true;
          this.imageURL = user.avatar;
        }
        // profile form
        this.profileForm = this._formBuilder.group({
          id: [user._id],
          firstName: [user.firstName, Validators.required],
          lastName: [user.lastName, Validators.required],
          email: [user.email],
          phoneNumber: [user.phoneNumber, Validators.required],
          street: [user.street],
          city: [user.city],
          state: [user.state],
          zipCode: [user.zipCode],
        });
        // security questions form
        this.secQuestionsForm = this._formBuilder.group({
          question1: new FormControl(null),
          answer2: new FormControl(null),
          question2: new FormControl(null),
          answer1: new FormControl(null),
          question3: new FormControl(null),
          answer3: new FormControl(null),
        });
        // loop through all security questions that are not disabled
        this.secQuestionsForm.controls['question1'].valueChanges.subscribe((value) => {
          this.sqList.forEach((e) => {
            if (e._id === value) {
              e.tempDisabled = true;
            } else if (
              this.secQuestionsForm.get('question2').value !== e._id &&
              this.secQuestionsForm.get('question3').value !== e._id
            ) {
              e.tempDisabled = false;
            }
          });
        });
        this.secQuestionsForm.controls['question2'].valueChanges.subscribe((value) => {
          this.sqList.forEach((e) => {
            if (e._id === value) {
              e.tempDisabled = true;
            } else if (
              this.secQuestionsForm.get('question1').value !== e._id &&
              this.secQuestionsForm.get('question3').value !== e._id
            ) {
              e.tempDisabled = false;
            }
          });
        });
        this.secQuestionsForm.controls['question3'].valueChanges.subscribe((value) => {
          this.sqList.forEach((e) => {
            if (e._id === value) {
              e.tempDisabled = true;
            } else if (
              this.secQuestionsForm.get('question1').value !== e._id &&
              this.secQuestionsForm.get('question2').value !== e._id
            ) {
              e.tempDisabled = false;
            }
          });
        });

        // populate dropdowns with security questions
        if (this.user.securityAnswers !== null) {
          let i = 1;
          user.securityAnswers.forEach((e) => {
            this.secQuestionsForm.controls['question' + i].setValue(e.questionId, { onlySelf: true });
            this.secQuestionsForm.controls['answer' + i].setValue(e.answer, [Validators.required]);
            i++;
          });
        }

        this.passwordForm = this._formBuilder.group({
          password: ['', Validators.required],
        });

        this.loading = false;
      });
    });
  }

  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];

    if (file.size > 50000) {
      this.imageTooLarge = true;
      return;
    }
    this.imageTooLarge = false;

    if (file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png') {
      this.incorrectImageType = true;
      return;
    }
    this.alreadyUploaded = false;
    this.imageName = '\t' + file.name;

    this.uploadForm.patchValue({
      avatar: file,
    });
    this.uploadForm.get('avatar').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  // deleteAvatar() {
  //   this.userService.deleteAvatar(this.profileForm.controls.id.value).subscribe((res) => {
  //     this._snackBar.open(res, 'X', {
  //       duration: 1000,
  //     });
  //     this.alreadyUploaded = true;
  //     this.imageURL = null;
  //     setTimeout(() => {
  //       this.router.navigate(['/profile']);
  //     }, 1000);
  //   });
  // }

  // submitAvatar() {
  //   const user: User = {
  //     _id: this.profileForm.controls.id.value,
  //     username: null,
  //     firstName: null,
  //     lastName: null,
  //     disabled: null,
  //     email: null,
  //     phoneNumber: null,
  //     street: null,
  //     city: null,
  //     state: null,
  //     zipCode: null,
  //     role: null,
  //     avatar: this.imageURL,
  //     securityAnswers: null,
  //     password: null,
  //     dateCreated: null,
  //     dateModified: null,
  //   };
  //   this.userService.updateAvatar(user).subscribe((res) => {
  //     this._snackBar.open(res, 'X', {
  //       duration: 1000,
  //     });
  //     setTimeout(() => {
  //       this.router.navigate(['/profile']);
  //     }, 1000);
  //   });
  // }

  onSubmit() {
    if (!this.profileForm.valid || !this.secQuestionsForm.valid) {
      return;
    }
    const profileInfo: User = {
      _id: this.user._id,
      firstName: this.profileForm.get('firstName').value,
      lastName: this.profileForm.get('lastName').value,
      email: this.profileForm.get('email').value,
      phoneNumber: this.profileForm.get('phoneNumber').value,
      street: this.profileForm.get('street').value,
      city: this.profileForm.get('city').value,
      state: this.profileForm.get('state').value,
      zipCode: this.profileForm.get('zipCode').value,
      username: this.user.username,
      role: this.user.role,
      dateCreated: this.user.dateCreated,
      dateModified: this.date,
      avatar: this.user.avatar,
      disabled: this.user.disabled,
      securityAnswers: null,
      password: null,
    };
    this.loading = true;
    this.userService.updateUser(profileInfo).subscribe((message) => {
      this._snackBar.open(message, 'X', {
        duration: 2000,
      });
    });
    setTimeout(() => {
      this.sendToastMessage(`${this.user.username}'s profile has been update successfully!`);
      this.loading = false;
    }, 1000);
  }

  sendToastMessage(message: string) {
    this._snackBar.open(message, 'X', {
      duration: 2000,
    });
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('account-settings');
  }
}
