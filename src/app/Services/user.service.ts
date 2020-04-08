import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: "root"})

export class UserService {

  private email: string;
  private passward: string;
  private firstname: string;
  private lastname: string;
  private address: string;

  constructor(private http: HttpClient, private router: Router) {}

  // we can make our create user related http requests in this file - Kurt
  createUser(email:string, passward: string, firstname:string, lastname:string,
    address:string) {
    // this.http.post( BACKEND_URL + "/create")
    //   .subscribe(response => {
    //     console.log(response);
    //   });
    console.log("user.service.ts-email: " + email);
    console.log("user.service.ts-passward:  " + passward);
    console.log("user.service.ts-firstname: " + firstname);
    console.log("user.service.ts-lastname:  " + lastname);
    console.log("user.service.ts-address: " + address);

  }
}
