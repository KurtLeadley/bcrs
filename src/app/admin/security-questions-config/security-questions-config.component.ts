import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../Services/question.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-security-questions-config',
  templateUrl: './security-questions-config.component.html',
  styleUrls: ['./security-questions-config.component.css']
})
export class SecurityQuestionsConfigComponent implements OnInit {

  loadListSecurityComponent: boolean;
  loadCreateSecurityComponent: boolean;

  constructor(public questionService: QuestionService, public router : Router) {}

  ngOnInit() {
    // observe the booleans for displaying the components
    this.questionService.displayList.subscribe((displayList) => {
      this.loadListSecurityComponent = displayList;
    });
    this.questionService.displayCreate.subscribe((displayCreate) => {
      this.loadCreateSecurityComponent = displayCreate;
    });
  }
  // next two methods toggle our component display booleans (they are used in the html files)
  showCreateSecurityComponent() {
    this.questionService.setDisplayListStatus(false);
    this.questionService.setDisplayCreateStatus(true);
  }
  showListSecurityComponent() {
    this.questionService.setDisplayListStatus(true);
    this.questionService.setDisplayCreateStatus(false);
  }
}
