/**
 * Title: pages/login/login.component.ts
 * Authors: Group 4
 * Description: bcrs
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loading = false;
  loginForm: FormGroup;
  role: string;
  hide: boolean;
  focus;
  focus1;

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onLogin() {
    console.log('Login form on submit');
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    setTimeout(() => {
      this.auth.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value);
      this.sendToastMessage('Login successful!');
      this.role = localStorage.getItem('role');
      switch (this.role) {
        case 'admin':
          this.router.navigate(['/admin/purchases']);
          break;
        case 'standard':
          this.router.navigate(['/service-repair']);
          break;
        default:
          this.router.navigate(['/invoices']);
          break;
      }
      this.loading = false;
    }, 2000);
  }

  sendToastMessage(message: string) {
    this._snackBar.open(message, 'X', {
      duration: 2000,
    });
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');
  }
}
