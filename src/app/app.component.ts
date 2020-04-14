import { Component, OnInit } from '@angular/core';
import { AuthService } from './Services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private auth: AuthService ) {}

  title = 'bcrs-two';

  ngOnInit() {
    this.auth.getToken();
    console.log( this.auth.getToken());
  }

}


