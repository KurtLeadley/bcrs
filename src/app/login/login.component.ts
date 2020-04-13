import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../Services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  title: 'login';

  loginForm: FormGroup;
  email= new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor(private auth: AuthService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    if (this.auth.loggedIn) {
      this.router.navigate(['/']);
    }
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe(
      (res) => this.router.navigate(['/']),
      (error) => console.log('invalid credentials!', error.message)
    );
  }
}
