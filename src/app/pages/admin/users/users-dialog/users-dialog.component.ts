/**
 * Title: pages/admin/users/users-dialog/users-dialog.component.ts
 * Authors: Group 4
 * Description: bcrs
 */
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../../../../models/user.model';
import { UserService } from '../../../../services/user.service';
import { AuthService } from '../../../../services/auth.service';
import { Role } from '../../../../models/role.model';
import { RoleService } from '../../../../services/role.service';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.scss'],
})
export class UsersDialogComponent implements OnInit, OnDestroy {
  loading = false;
  date = new Date();
  roles: Role[] = [];
  usersForm: FormGroup;
  hide: boolean;
  states = [
    {
      name: 'Alabama',
      abbreviation: 'AL',
    },
    {
      name: 'Alaska',
      abbreviation: 'AK',
    },
    {
      name: 'American Samoa',
      abbreviation: 'AS',
    },
    {
      name: 'Arizona',
      abbreviation: 'AZ',
    },
    {
      name: 'Arkansas',
      abbreviation: 'AR',
    },
    {
      name: 'California',
      abbreviation: 'CA',
    },
    {
      name: 'Colorado',
      abbreviation: 'CO',
    },
    {
      name: 'Connecticut',
      abbreviation: 'CT',
    },
    {
      name: 'Delaware',
      abbreviation: 'DE',
    },
    {
      name: 'District Of Columbia',
      abbreviation: 'DC',
    },
    {
      name: 'Federated States Of Micronesia',
      abbreviation: 'FM',
    },
    {
      name: 'Florida',
      abbreviation: 'FL',
    },
    {
      name: 'Georgia',
      abbreviation: 'GA',
    },
    {
      name: 'Guam',
      abbreviation: 'GU',
    },
    {
      name: 'Hawaii',
      abbreviation: 'HI',
    },
    {
      name: 'Idaho',
      abbreviation: 'ID',
    },
    {
      name: 'Illinois',
      abbreviation: 'IL',
    },
    {
      name: 'Indiana',
      abbreviation: 'IN',
    },
    {
      name: 'Iowa',
      abbreviation: 'IA',
    },
    {
      name: 'Kansas',
      abbreviation: 'KS',
    },
    {
      name: 'Kentucky',
      abbreviation: 'KY',
    },
    {
      name: 'Louisiana',
      abbreviation: 'LA',
    },
    {
      name: 'Maine',
      abbreviation: 'ME',
    },
    {
      name: 'Marshall Islands',
      abbreviation: 'MH',
    },
    {
      name: 'Maryland',
      abbreviation: 'MD',
    },
    {
      name: 'Massachusetts',
      abbreviation: 'MA',
    },
    {
      name: 'Michigan',
      abbreviation: 'MI',
    },
    {
      name: 'Minnesota',
      abbreviation: 'MN',
    },
    {
      name: 'Mississippi',
      abbreviation: 'MS',
    },
    {
      name: 'Missouri',
      abbreviation: 'MO',
    },
    {
      name: 'Montana',
      abbreviation: 'MT',
    },
    {
      name: 'Nebraska',
      abbreviation: 'NE',
    },
    {
      name: 'Nevada',
      abbreviation: 'NV',
    },
    {
      name: 'New Hampshire',
      abbreviation: 'NH',
    },
    {
      name: 'New Jersey',
      abbreviation: 'NJ',
    },
    {
      name: 'New Mexico',
      abbreviation: 'NM',
    },
    {
      name: 'New York',
      abbreviation: 'NY',
    },
    {
      name: 'North Carolina',
      abbreviation: 'NC',
    },
    {
      name: 'North Dakota',
      abbreviation: 'ND',
    },
    {
      name: 'Northern Mariana Islands',
      abbreviation: 'MP',
    },
    {
      name: 'Ohio',
      abbreviation: 'OH',
    },
    {
      name: 'Oklahoma',
      abbreviation: 'OK',
    },
    {
      name: 'Oregon',
      abbreviation: 'OR',
    },
    {
      name: 'Palau',
      abbreviation: 'PW',
    },
    {
      name: 'Pennsylvania',
      abbreviation: 'PA',
    },
    {
      name: 'Puerto Rico',
      abbreviation: 'PR',
    },
    {
      name: 'Rhode Island',
      abbreviation: 'RI',
    },
    {
      name: 'South Carolina',
      abbreviation: 'SC',
    },
    {
      name: 'South Dakota',
      abbreviation: 'SD',
    },
    {
      name: 'Tennessee',
      abbreviation: 'TN',
    },
    {
      name: 'Texas',
      abbreviation: 'TX',
    },
    {
      name: 'Utah',
      abbreviation: 'UT',
    },
    {
      name: 'Vermont',
      abbreviation: 'VT',
    },
    {
      name: 'Virgin Islands',
      abbreviation: 'VI',
    },
    {
      name: 'Virginia',
      abbreviation: 'VA',
    },
    {
      name: 'Washington',
      abbreviation: 'WA',
    },
    {
      name: 'West Virginia',
      abbreviation: 'WV',
    },
    {
      name: 'Wisconsin',
      abbreviation: 'WI',
    },
    {
      name: 'Wyoming',
      abbreviation: 'WY',
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<UsersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: string; obj: User },
    private userService: UserService,
    private roleService: RoleService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('index-page');
    this.roleService.getRoles().subscribe((roleList) => {
      this.roles = roleList;
    });

    this.usersForm = this.formBuilder.group({
      action: new FormControl(this.data.action),
      _id: new FormControl(this.data.obj._id),
      username: new FormControl(this.data.obj.username, Validators.required),
      firstName: new FormControl(this.data.obj.firstName, Validators.required),
      lastName: new FormControl(this.data.obj.lastName, Validators.required),
      phoneNumber: new FormControl(this.data.obj.phoneNumber, Validators.required),
      street: new FormControl(this.data.obj.street),
      city: new FormControl(this.data.obj.city),
      state: new FormControl(this.data.obj.state),
      zipCode: new FormControl(this.data.obj.zipCode),
      email: new FormControl(this.data.obj.email, [Validators.required, Validators.email]),
      disabled: new FormControl(this.data.obj.disabled),
      role: new FormControl(this.data.obj.role, Validators.required),
      password: ['', Validators.required],
    });
    if (this.data.action === 'Update') {
      this.usersForm.controls.password.disable();
    }
    if (this.data.action === 'Reset') {
      this.usersForm.controls.username.disable();
      this.usersForm.controls.firstName.disable();
      this.usersForm.controls.lastName.disable();
      this.usersForm.controls.phoneNumber.disable();
      this.usersForm.controls.street.disable();
      this.usersForm.controls.city.disable();
      this.usersForm.controls.state.disable();
      this.usersForm.controls.zipCode.disable();
      this.usersForm.controls.email.disable();
      this.usersForm.controls.role.disable();
    }
    if (this.data.action === 'Delete') {
      this.usersForm.controls.username.disable();
      this.usersForm.controls.firstName.disable();
      this.usersForm.controls.lastName.disable();
      this.usersForm.controls.phoneNumber.disable();
      this.usersForm.controls.street.disable();
      this.usersForm.controls.city.disable();
      this.usersForm.controls.state.disable();
      this.usersForm.controls.zipCode.disable();
      this.usersForm.controls.email.disable();
      this.usersForm.controls.role.disable();
      this.usersForm.controls.password.disable();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave() {
    if (this.usersForm.invalid) {
      return;
    }

    this.loading = true;
    const action = this.usersForm.controls.action.value;

    const user: User = {
      _id: this.usersForm.controls._id.value,
      username: this.usersForm.controls.username.value,
      password: this.usersForm.controls.password.value,
      firstName: this.usersForm.controls.firstName.value,
      lastName: this.usersForm.controls.lastName.value,
      phoneNumber: this.usersForm.controls.phoneNumber.value,
      street: this.usersForm.controls.street.value,
      city: this.usersForm.controls.city.value,
      state: this.usersForm.controls.state.value,
      zipCode: this.usersForm.controls.zipCode.value,
      email: this.usersForm.controls.email.value,
      disabled: this.usersForm.controls.disabled.value,
      role: this.usersForm.controls.role.value,
      securityAnswers: null,
      avatar: null,
      dateCreated: this.date,
      dateModified: this.date,
    };
    setTimeout(() => {
      if (action === 'Add') {
        user.disabled = false;
        this.userService.createUser(user).subscribe((message) => {
          this.sendToastMessage('User has been successfully created!');
        });
      } else if (action === 'Update') {
        this.userService.updateUser(user).subscribe((message) => {
          this.sendToastMessage('User has been successfully updated!');
        });
      } else if (action === 'Delete') {
        let msg = '';
        if (user.disabled === false) {
          msg = 'User is now disabled';
          user.disabled = true;
        } else {
          msg = 'User is now active';
          user.disabled = false;
        }
        this.userService.deleteUser(user).subscribe((message) => {
          this.sendToastMessage('User has been successfully disabled!');
        });
      } else if (action === 'Reset') {
        console.log('Reset Password');
      }
      this.loading = false;
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
