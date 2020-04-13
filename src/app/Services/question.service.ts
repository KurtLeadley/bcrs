import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Router } from "@angular/router";
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';

import { Question } from "../Models/question.model";


@Injectable()

export class QuestionService {

  // initialize our http and router methods on construction
  constructor(private http: HttpClient,  private router: Router) {}

  // mock server route to questions using json server
  questionUrl = 'http://localhost:3000/questions';

  // create observable subjects for displaying security question components
  private displayListSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);
  displayList = this.displayListSubject.asObservable();

  private displayCreateSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  displayCreate = this.displayCreateSubject.asObservable();

  // observe delete
  public deleteOperationEvent: Subject<boolean> = new Subject();

  // post a question to our mock server db
  createQuestion(id: string, question:string,) {
    // build our question in Question form
    const newQuestion: Question = {id: id, question: question}
    // post the Question to the this.questionUrl
    this.http.post( this.questionUrl, newQuestion)
      .subscribe(response => {
        console.log(response);
        // this router method is not working as expected
        this.router.navigate(["admin/security/"]);
      });
  }

  // fetches question json as observable to subscribe to in list-security-questions component
  getQuestions(): Observable<any> {
    return this.http.get<Question>(this.questionUrl);
  }

  // get specific question with id passed in
  getQuestion(id: string) {
    return this.http.get<Question>(this.questionUrl + "/" + id);
  }

  // update a question
  updateQuestion(id: string, questionText: string) {
    // only difference from the create is that it is a http.put with an id being passed
    const question: Question = { id: id, question: questionText};
    this.http
      .put(this.questionUrl + "/" + id, question)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(["admin/security/"]);
      });
  }

  deleteQuestion(id) {
    //todo: we can't delete questions completely apparently....Instead, we need to update the boolean property defined in the BRD
    console.log(this.questionUrl + "/" + id);
    this.http.delete(this.questionUrl + "/" + id).subscribe(response => {
      console.log(response);
      this.router.navigate(["admin/security/"]);
      this.deleteOperationEvent.next(true);
    });
  }

  // methods to set display status of components
  setDisplayListStatus = (value: boolean) => {
    this.displayListSubject.next(value);
  }

  setDisplayCreateStatus = (value: boolean) => {
    this.displayCreateSubject.next(value);
  }

  // delete event observable
  getDeleteOperationEvent(): Observable<boolean> {
    return this.deleteOperationEvent.asObservable();
  }

}
