// check this page out
// https://angular.io/guide/reactive-forms
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

import { QuestionService } from '../../../Services/question.service';
import { Question } from '../../../Models/question.model';

@Component({
  selector: 'app-create-security-question',
  templateUrl: './create-security-question.component.html',
  styleUrls: ['./create-security-question.component.css']
})
export class CreateSecurityQuestionComponent implements OnInit {

  // call in the question.service.ts file on construction of this component
  constructor(public questionService: QuestionService,
    public route: ActivatedRoute,
    public router : Router
  ) { }

  questionForm: FormGroup;
  question: Question;
  private mode = "create";
  private id: string;

  ngOnInit() {
    // create a form group with two required fields
    this.questionForm = new FormGroup({
      id: new FormControl('', Validators.required),
      questionText: new FormControl('', Validators.required),
    });

    // Note: 'firstChild' is the key to getting the id parameter.
    // This is because the 'router-outlet' in 'app.component.html' does not look at child routes
    // router-outlet is at the top level in our app and can only look at params of top level routes.
    // Look how we have it set up in 'app-routing.module.ts'
    // Solving this issue was a real pain in the ass.....
    this.route.firstChild.paramMap.subscribe((paramMap: ParamMap) => {
      // if the url contains an id, we are editing
      if (paramMap.has("id")) {
        console.log(paramMap);
        // change mode to edit so that we can later determine what questionService method to call
        this.mode = "edit";
        this.id = paramMap.get("id");
        // let's find our question of interest by id, so we can load it into the form
        this.questionService.getQuestion(this.id).subscribe(questionData => {
          this.question = {
            id: questionData.id,
            question: questionData.question
          };
          console.log(this.question);
          // load our question of interest into this components form
          this.questionForm.setValue({
            id: this.question.id,
            questionText: this.question.question
          })
        });
        // if the url does not contain an id, we are creating
      } else {
        this.mode = "create";
        this.id = null;
      }
    });
  }

  onSubmit() {
    // logging the form on submission tells us how to get to the question and question id values
    console.log(this.questionForm);
    // send the question and question id to our service, where we post to our mock db
    if (this.mode === "create") {
      this.questionService.createQuestion(this.questionForm.value.id,this.questionForm.value.questionText);
      // if the mode is not create, we want to update the question
    } else {
      // call our updateQuestion method from the questionService
      this.questionService.updateQuestion(
        this.id,
        this.questionForm.value.questionText
      )
    }
    // after submitting, we want to display the list again and hide the create component
    this.questionService.setDisplayListStatus(true);
    this.questionService.setDisplayCreateStatus(false);
  }
}
