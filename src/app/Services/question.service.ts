import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../Models/question.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class QuestionService {
  // mock server route to questions using json server
  questionUrl = 'http://localhost:3000/questions';

  // initialize our http and router methods on construction
  constructor(private http: HttpClient, private router: Router) {}

  // post a question to our mock server db
  createQuestion(qId: string, question: string) {
    // build our question in Question form
    const newQuestion: Question = { qId: qId, question: question };
    // post the Question to the this.questionUrl
    this.http.post(this.questionUrl, newQuestion).subscribe((response) => {
      console.log(response);
      // this router method is not working as expected
      this.router.navigate(['admin/security/list-security']);
    });
  }

  // fetches question json as observable to subscribe to in list-security-questions component
  getQuestions(): Observable<any> {
    return this.http.get<Question>(this.questionUrl);
  }

  deleteQuestion(qId) {
    //todo: we can't delete questions completely apparently....Instead, we need to update the boolean property defined in the BRD
    console.log(this.questionUrl + '/' + qId);
    this.http.delete(this.questionUrl + '/' + qId).subscribe((response) => {
      console.log(response);
      this.router.navigate(['admin/security/list-security']);
    });
  }

  // don't worry about trying to log this right now, this is much more complicated and not set up to work yet
  editQuestion(qId, question) {
    console.log('Todo: Make HTTP update request here for qId: ' + qId);
  }
}
