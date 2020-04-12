import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User } from "../Models/user.model";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable()

export class UserService {
  // initialize our http and router methods on construction

  constructor(private http: HttpClient, private router: Router) {}
  // mock server route to questions using json server
  userUrl = 'http://localhost:3000/users';
  // create observable subjects for displaying security question components
  private displayListSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);
  displayList = this.displayListSubject.asObservable();

  private displayCreateSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  displayCreate = this.displayCreateSubject.asObservable();


  public deleteOperationEvent: Subject<boolean> = new Subject();
   // posts a user to our mock server db
  createUser(id:string, password: string, firstName:string, lastName:string, address:string, email:string) {
    // build our user with the User model
    const newUser: User = {id:id, firstName:firstName, lastName:lastName, email: email, address:address, password:password};

    this.http.post(this.userUrl,newUser).subscribe(
      Response =>{
        console.log(Response);
        // this router method is not working as expected
        this.router.navigate(["admin/users/"])
      });
  }

  // fetches user json as observable to subscribe to in list-user component
  getUsers():Observable<any>{
    return this.http.get<User>(this.userUrl);
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
  // don't worry about trying to log this right now, this is much more complicated and not set up to work yet
  editUser(id,password, firstName,lastName,address,email ) {
    console.log("Todo: Make HTTP update request here for qId: " + id);
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
