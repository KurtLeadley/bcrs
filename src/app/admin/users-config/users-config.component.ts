import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-config',
  templateUrl: './users-config.component.html',
  styleUrls: ['./users-config.component.css']
})
export class UsersConfigComponent implements OnInit {

  loadCreateUserComponent = false;
  loadListUsersComponent = false;

  constructor() { }

  ngOnInit(): void {
  }
  showCreateUserComponent() {
    this.loadCreateUserComponent = true;
    this.loadListUsersComponent = false;
  }
  showListUsersComponent() {
    this.loadCreateUserComponent = false;
    this.loadListUsersComponent = true;
  }
}
