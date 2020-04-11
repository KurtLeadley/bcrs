import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../Services/question.service';

@Component({
  selector: 'app-security-questions-config',
  templateUrl: './security-questions-config.component.html',
  styleUrls: ['./security-questions-config.component.css']
})
export class SecurityQuestionsConfigComponent implements OnInit {

  loadListSecurityComponent: boolean;
  loadCreateSecurityComponent: boolean;

  constructor(public questionService: QuestionService) {}

  ngOnInit() {
    // observe the booleans for displaying the components
    this.questionService.displayList.subscribe((displayList) => {
      this.loadListSecurityComponent = displayList;
    });
    this.questionService.displayCreate.subscribe((displayCreate) => {
      this.loadCreateSecurityComponent = displayCreate;
    });
  }
  showCreateSecurityComponent() {
    this.questionService.setDisplayListStatus(false);
    this.questionService.setDisplayCreateStatus(true);
  }
}
