import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
//import {SessionService} from '../session.service';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  form: FormGroup
  user: any

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required ])],
      password: [null, Validators.compose([Validators.required ])],
      firstname: [null, Validators.compose([Validators.required ])],
      lastname: [null, Validators.compose([Validators.required ])],
      address: [null, Validators.compose([Validators.required ])],
      answer1: [null, Validators.compose([Validators.required ])],
      answer2: [null, Validators.compose([Validators.required ])],
      answer3: [null, Validators.compose([Validators.required ])],
      answer4: [null, Validators.compose([Validators.required ])],
    })
  }
  onSubmit() {
    this.user = {
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
      last_name: this.form.controls['lastname'].value,
      first_name: this.form.controls['firstname'].value,
      address: this.form.controls['address'].value,
      answer1: this.form.controls['answer1'].value,
      answer2: this.form.controls['answer2'].value,
      answer3: this.form.controls['answer3'].value,
      answer4: this.form.controls['answer4'].value,
    }

    this.http.post('/api/session/register', this.user).subscribe(res => {
      this.router.navigate(['/session/login'], res)
    })
  }
}
