import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-security-question',
  templateUrl: './create-security-question.component.html',
  styleUrls: ['./create-security-question.component.css']
})
export class CreateSecurityQuestionComponent implements OnInit {
  id: String
  form: FormGroup
  questionnaire: any
  token: string
  users: any
  user: any
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,  private route: ActivatedRoute) {
    // gets token from local storage and assigns to this.token


   // this.token = sessionService.getLocalStorage()

    // creates a new HttpHeaders and assigns this.token to the x-access-token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.token
    })
    // pulls the info and assigns to data
    this.http.get('http://localhost:3000/api/user', {headers} ).subscribe(data => {
      this.users = data
    });


    this.id = route.snapshot.paramMap.get('id')

    // grabs database info and maps the info from the selected user for current info
    this.http.get('/api/user/' + this.id).subscribe( data => {
      this.questionnaire = {
        answer1: data['answer1'],
        answer2: data['answer2'],
        answer3: data['answer3'],
        answer4: data['answer4']
      }
    })

}


  ngOnInit(): void {
    this.form = this.fb.group({
      answer1: [null, Validators.compose([Validators.required ])],
      answer2: [null, Validators.compose([Validators.required ])],
      answer3: [null, Validators.compose([Validators.required ])],
      answer4: [null, Validators.compose([Validators.required ])],
    })
  }
  onSubmit() {
    this.questionnaire = {
      answer1: this.form.controls['answer1'].value,
      answer2: this.form.controls['answer2'].value,
      answer3: this.form.controls['answer3'].value,
      answer4: this.form.controls['answer4'].value,
    }

    this.http.put('/api/questionnaire/' + this.id, this.questionnaire).subscribe(res => {
      this.router.navigate(['/users'], res)
    })
  }

}
