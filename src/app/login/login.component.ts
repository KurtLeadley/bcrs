import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
//import {SessionService} from '../session.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }
  form: FormGroup
  user: any
  ngOnInit() {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required ])],
      password: [null, Validators.compose([Validators.required ])],
    })
    // set default value for quick logging in
    //this.form.controls['email'].setValue('bobsmith@email.com')
    //this.form.controls['password'].setValue('s3cret')
  }

  onSubmit() {
    this.user = {
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
    }

    /* this.http.post('/api/session/login', this.user).subscribe(res => {
      this.sessionService.setLocalStorage(res['token'])
      this.router.navigate(['/homepage'], res);
    }) */
  }

}
