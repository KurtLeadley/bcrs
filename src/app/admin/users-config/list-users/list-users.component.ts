import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Services/user.service';
import { User } from "../../../Models/user.model";


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
users : User[] =[];
// initialize our UserService methods on component construction
  constructor(public userService: UserService) { }

  ngOnInit(){
    // as soon as the page loads, get our users from the user service http call
    this.userService.getUsers().subscribe(ResponseData => {
      // users is now subscribed to, so that means we can place it in our html file.
      // We can't access users outside this subscribe method.
      this.users = ResponseData;
    });
  }
  onDelete(userId:string){
    this.userService.deleteUser(userId);
  }

}
