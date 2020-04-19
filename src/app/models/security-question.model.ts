/**
 * Title: models/security-question.model.ts
 * Authors: Group 4
 * Description: bcrs
 */
export interface SecurityQuestion {
  _id: String;
  text: String;
  disabled: Boolean;
  tempDisabled: Boolean;
}
