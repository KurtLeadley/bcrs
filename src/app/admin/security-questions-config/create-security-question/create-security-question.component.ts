// check this page out
// https://angular.io/guide/reactive-forms
import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl} from '@angular/forms';
import { QuestionService } from '../../../Services/question.service';

@Component({
  selector: 'app-create-security-question',
  templateUrl: './create-security-question.component.html',
  styleUrls: ['./create-security-question.component.css']
})
export class CreateSecurityQuestionComponent {
  // create a form group with two required fields
  questionForm = new FormGroup({
    qId: new FormControl('', Validators.required),
    question: new FormControl('', Validators.required),
  });
  // call in the question.service.ts file on construction of this component
  constructor(public questionService: QuestionService) { }

  onSubmit() {
    // logging the form on submission tells us how to get to the question and question id values
    console.log(this.questionForm);
    // send the question and question id to our service, where we post to our mock db
    this.questionService.createQuestion(this.questionForm.value.qId,this.questionForm.value.question);
    this.questionService.setDisplayListStatus(true);
    this.questionService.setDisplayCreateStatus(false);
  }
}
