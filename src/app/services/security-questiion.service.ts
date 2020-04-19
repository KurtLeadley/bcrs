/**
 * Title: services/security-question.service.ts
 * Authors: Group 4
 * Description: bcrs
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SecurityQuestion } from '../models/security-question.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SecurityQuestionService {
  apiUrl = 'http://localhost:5000/api/v1';

  constructor(private http: HttpClient, public auth: AuthService) {}

  // Security Question CRUD methods
  getSecurityQuestions(): Observable<SecurityQuestion[]> {
    return this.http
      .get<{ message: String; questions: SecurityQuestion[] }>(this.apiUrl + '/security-questions')
      .pipe(map((x) => x.questions));
  }

  getSecurityQuestion(_id: String): Observable<SecurityQuestion> {
    return this.http
      .get<{ message: String; question: SecurityQuestion }>(this.apiUrl + '/security-questions/' + _id)
      .pipe(map((x) => x.question));
  }

  getSecurityQuestionsByIds(securityQuestionIds: String[]): Observable<SecurityQuestion[]> {
    return this.http
      .post<{ message: String; questions: SecurityQuestion[] }>(
        this.apiUrl + '/security-questions/by-ids',
        securityQuestionIds
      )
      .pipe(map((x) => x.questions));
  }

  createSecurityQuestion(securityQuestion: SecurityQuestion): Observable<string> {
    return this.http
      .post<{ message: string; question: SecurityQuestion }>(this.apiUrl + '/security-questions', securityQuestion)
      .pipe(map((x) => x.message));
  }

  updateSecurityQuestion(securityQuestion: SecurityQuestion): Observable<string> {
    return this.http
      .put<{ message: string; question: SecurityQuestion }>(
        this.apiUrl + '/security-questions/' + securityQuestion._id,
        securityQuestion
      )
      .pipe(map((x) => x.message));
  }

  deleteSecurityQuestion(securityQuestion: SecurityQuestion): Observable<string> {
    return this.http
      .delete<{ message: string; question: SecurityQuestion }>(
        this.apiUrl + '/security-question/' + securityQuestion._id
      )
      .pipe(map((x) => x.message));
  }
}
