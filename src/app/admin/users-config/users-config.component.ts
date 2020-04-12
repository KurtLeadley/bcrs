import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-users-config',
  templateUrl: './users-config.component.html',
  styleUrls: ['./users-config.component.css']
})
export class UsersConfigComponent implements OnInit {

  loadListUsersComponent: boolean;
  loadCreateUserComponent: boolean;

  constructor(public userService: UserService) {}

  ngOnInit() {
    // observe the booleans for displaying the components
    this.userService.displayList.subscribe((displayList) => {
      this.loadListUsersComponent = displayList;
    });
    this.userService.displayCreate.subscribe((displayCreate) => {
      this.loadCreateUserComponent = displayCreate;
    });
  }
  showCreateUserComponent() {
    this.userService.setDisplayListStatus(false);
    this.userService.setDisplayCreateStatus(true);
  }
}
