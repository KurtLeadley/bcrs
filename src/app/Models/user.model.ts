export class User {
  id?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  disabled?: boolean;
  role?: string;
  securityQuestions?: [string];
  password?: string;
  dateCreated?: Date;
  dateModified?: Date;
}
