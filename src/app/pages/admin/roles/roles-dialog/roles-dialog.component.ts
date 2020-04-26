/**
 * Title: pages/admin/roles/roles-dialog/roles-dialog.component.ts
 * Authors: Group 4
 * Description: bcrs
 */
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from '../../../../models/role.model';
import { RoleService } from '../../../../services/role.service';

@Component({
  selector: 'app-roles-dialog',
  templateUrl: './roles-dialog.component.html',
  styleUrls: ['./roles-dialog.component.scss'],
})
export class RolesDialogComponent implements OnInit, OnDestroy {
  loading = false;
  rolesFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RolesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: String; obj: Role },
    public roleService: RoleService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('account-settings');
    // Build new form
    this.rolesFormGroup = this.formBuilder.group({
      action: new FormControl(this.data.action),
      _id: new FormControl(this.data.obj._id),
      text: new FormControl(this.data.obj.text, [Validators.required]),
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.rolesFormGroup.invalid) {
      return;
    }

    this.loading = true;
    const action = this.rolesFormGroup.controls.action.value;

    const role: Role = {
      _id: this.rolesFormGroup.controls._id.value,
      text: this.rolesFormGroup.controls.text.value,
    };

    setTimeout(() => {
      if (action === 'Create') {
        this.roleService.createRole(role).subscribe((role) => {
          this.sendToastMessage(role.text + ' was created!');
        });
      } else if (action === 'Update') {
        this.roleService.updateRole(role).subscribe((role) => {
          this.sendToastMessage(`${role.text} has been updated!`);
        });
      } else if (action === 'Delete') {
        this.roleService.deleteRole(role).subscribe((role) => {
          this.sendToastMessage(`${role.text} has been deleted!`);
        });
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
    body.classList.remove('account-settings');
  }
}
