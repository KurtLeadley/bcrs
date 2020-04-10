import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../Services/question.service';
import { Question } from '../../../Models/question.model';

@Component({
  selector: 'app-list-security-questions',
  templateUrl: './list-security-questions.component.html',
  styleUrls: ['./list-security-questions.component.css'],
})
export class ListSecurityQuestionsComponent implements OnInit {
  questions: Question[] = [];
  // initialize our QuestionService methods on component construction
  constructor(public questionService: QuestionService) {}

  ngOnInit() {
    // as soon as the page loads, get our questions from the question service http call
    this.questionService.getQuestions().subscribe((responseData) => {
      // questions is now subscribed to, so that means we can place it in our html file.
      // We can't access questions outside this subscribe method.
      this.questions = responseData;
    });
  }
  onDelete(qId: string) {
    this.questionService.deleteQuestion(qId);
  }
}
