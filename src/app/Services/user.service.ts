import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/user.model';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class UserService {
  // mock server route to questions using json server
  userUrl = 'http://localhost:3000/users';

  // initialize our http and router methods on construction

  /*  private email: string;
  private password: string;
  private firstName: string;
  private lastName: string;
  private address: string; */

  constructor(private http: HttpClient, private router: Router) {}

  // post a user to our mock server db
  createUser(userId: string, password: string, firstName: string, lastName: string, address: string, email: string) {
    // build our question in Question form
    const newUser: User = {
      userId: userId,
      password: password,
      firstName: firstName,
      lastName: lastName,
      address: address,
      email: email,
    };

    this.http.post(this.userUrl, newUser).subscribe((Response) => {
      console.log(Response);
      // this router method is not working as expected
      this.router.navigate(['admin/users/list-user']);
    });
  }
  // fetches user json as observable to subscribe to in list-user component
  getUsers(): Observable<any> {
    return this.http.get<User>(this.userUrl);
  }
  deleteUser(userId) {
    //todo: we can't delete questions completely apparently....Instead, we need to update the boolean property defined in the BRD
    console.log(this.userUrl + '/' + userId);
    this.http.delete(this.userUrl).subscribe((Response) => {
      console.log(Response);
      this.router.navigate(['admin/users/list-user']);
    });
  }
  // don't worry about trying to log this right now, this is much more complicated and not set up to work yet
  editUser(userId, password, firstName, lastName, address, email) {
    console.log('Todo: Make HTTP update request here for qId: ' + userId);
  }
}
