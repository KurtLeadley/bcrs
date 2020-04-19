/**
 * Title: models/user.model.ts
 * Authors: Group 4
 * Description: bcrs
 */
import { SecurityAnswer } from '../models/security-answer.model';

export interface User {
  _id: String;
  username: String;
  password: String;
  firstName: String;
  lastName: String;
  phoneNumber: String;
  street: String;
  city: String;
  state: String;
  zipCode: String;
  email: String;
  disabled: Boolean;
  role: String;
  securityAnswers: SecurityAnswer[];
  dateCreated: Date;
  dateModified: Date;
  avatar: string;
}
