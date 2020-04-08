import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: "root"})

export class QuestionService {

  private question: string;
  private qId: string;

  constructor(private http: HttpClient, private router: Router) {}

  // we can make our security question related http requests in this file - Kurt
  createQuestion(question:string, qId: string) {
    // this.http.post( BACKEND_URL + "/create")
    //   .subscribe(response => {
    //     console.log(response);
    //   });
    console.log("question.service.ts-qId: " + qId);
    console.log("question.service.ts-q: " + question);
  }
}
