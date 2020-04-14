import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  loggedInUser:string;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.loggedInUser = localStorage.getItem('user');
  }
  onLogout() {
    this.authService.logout();
  }
}
