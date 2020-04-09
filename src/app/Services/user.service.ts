import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: "root"})

export class UserService {

  private email: string;
  private password: string;
  private firstName: string;
  private lastName: string;
  private address: string;

  constructor(private http: HttpClient, private router: Router) {}

  // we can make our create user related http requests in this file - Kurt
  createUser(email:string, password: string, firstName:string, lastName:string,
    address:string) {
    // this.http.post( BACKEND_URL + "/create")
    //   .subscribe(response => {
    //     console.log(response);
    //   });
    console.log("user.service.ts-email: " + email);
    console.log("user.service.ts-passward:  " + password);
    console.log("user.service.ts-firstname: " + firstName);
    console.log("user.service.ts-lastname:  " + lastName);
    console.log("user.service.ts-address: " + address);

  }
}
