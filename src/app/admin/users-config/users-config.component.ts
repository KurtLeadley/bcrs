import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-users-config',
  templateUrl: './users-config.component.html',
  styleUrls: ['./users-config.component.css']
})
export class UsersConfigComponent implements OnInit {

  loadListUsersComponent: boolean;
  loadCreateUserComponent: boolean;

  constructor(public userService: UserService, public router: Router) {}

  ngOnInit() {
    // observe the booleans for displaying the components
    this.userService.displayList.subscribe((displayList) => {
      this.loadListUsersComponent = displayList;
    });
    this.userService.displayCreate.subscribe((displayCreate) => {
      this.loadCreateUserComponent = displayCreate;
    });
  }
  // next two methods toggle our component display booleans (they are used in the html files)
  showCreateUserComponent() {
    this.userService.setDisplayListStatus(false);
    this.userService.setDisplayCreateStatus(true);
  }
  showListUserComponent() {
    this.userService.setDisplayListStatus(true);
    this.userService.setDisplayCreateStatus(false);
  }
}
