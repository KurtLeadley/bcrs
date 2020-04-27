/**
 * Title: models/user.model.ts
 * Authors: Group 4
 * Description: bcrs
 */
import { SecurityAnswer } from '../models/security-answer.model';

export interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  email: string;
  disabled: boolean;
  role: string;
  securityAnswers: SecurityAnswer[];
  dateCreated: Date;
  dateModified: Date;
  avatar: string;
}
