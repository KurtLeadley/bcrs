import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, zip } from 'rxjs';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';

import { User } from "../Models/user.model";

@Injectable()

export class UserService {

  // initialize our http and router methods on construction
  constructor(private http: HttpClient, private router: Router) {}

  // mock server route to questions using json server
  userUrl = 'http://localhost:3000/users';
  authUrl = 'http://localhost:3000/auth';

  // create observable subjects for displaying security question components
  private displayListSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);
  displayList = this.displayListSubject.asObservable();

  private displayCreateSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  displayCreate = this.displayCreateSubject.asObservable();

  public deleteOperationEvent: Subject<boolean> = new Subject();

  // posts a user to our mock server db
  createUser(
    id?: string,
    username?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    phoneNumber?: string,
    street?: string,
    city?: string,
    state?: string,
    zipCode?: string,
    disabled?: boolean,
    role?: string,
    securityQuestions?: [string],
    password?: string,
    dateCreated?: Date,
    dateModified?: Date
  ) {
      // build our user with the User model
      const newUser: User = {
        id:id,
        username : username,
        firstName:firstName,
        lastName:lastName,
        email: email,
        phoneNumber: phoneNumber,
        street: street,
        city: city,
        state: state,
        zipCode: zipCode,
        disabled: disabled,
        role: role,
        securityQuestions: securityQuestions,
        password:password,
        dateCreated: dateCreated,
        dateModified: dateModified
      };

      this.http.post(this.userUrl,newUser).subscribe(
        Response =>{
          console.log(Response);
          // this router method is not working as expected
          this.router.navigate(["admin/users/"])
      });
  }


  // Log user in
  login(credentials): Observable<any> {
    return this.http.post<any>(this.authUrl +'/login', credentials);
  }

  // Get currently logged in user
  me(): Observable<User> {
    return this.http.get<User>(this.userUrl +'/auth/auth/me');
  }

  // fetches user json as observable to subscribe to in list-user component
  getUsers():Observable<any>{
    return this.http.get<User>(this.userUrl);
  }

  // get specific question with id passed in
  getUser(id: string) {
    return this.http.get<User>(this.userUrl + "/" + id);
  }

  // update a question
  updateUser(
    id?: string,
    username?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    phoneNumber?: string,
    street?: string,
    city?: string,
    state?: string,
    zipCode?: string,
    disabled?: boolean,
    role?: string,
    securityQuestions?: [string],
    password?: string,
    dateCreated?: Date,
    dateModified?: Date
  ) {
      // only difference from the create is that it is a http.put with an id being passed
      const user: User = {
        id:id,
        username : username,
        firstName:firstName,
        lastName:lastName,
        email: email,
        phoneNumber: phoneNumber,
        street: street,
        city: city,
        state: state,
        zipCode: zipCode,
        disabled: disabled,
        role: role,
        securityQuestions: securityQuestions,
        password:password,
        dateCreated: dateCreated,
        dateModified: dateModified
      };
      this.http
        .put(this.userUrl + "/" + id,user)
        .subscribe(response => {
          console.log(response);
          this.router.navigate(["admin/users/"]);
      });
    }

  deleteUser(id){
    //todo: we can't delete questions completely apparently....Instead, we need to update the boolean property defined in the BRD
    console.log(this.userUrl + "/" + id)
    this.http.delete(this.userUrl + "/" + id).subscribe(response => {
      console.log(response);
      this.router.navigate(["admin/users/"]);
      this.deleteOperationEvent.next(true);
    });

  }

  // methods to set display status of components
  setDisplayListStatus = (value: boolean) => {
    this.displayListSubject.next(value);
  }

  setDisplayCreateStatus = (value: boolean) => {
    this.displayCreateSubject.next(value);
  }

  getDeleteOperationEvent(): Observable<boolean> {
    return this.deleteOperationEvent.asObservable();
  }

}
