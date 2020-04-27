import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  youvisited: string;

  constructor() {}

  ngOnInit() {}
  submitForm() {
    const message = `My first name Is ${this.firstName}.
                    My last name ${this.lastName}.
                    my email is ${this.email}.
                    My message is ${this.message};
                    Have you visited the Bob's Computer Repair Shop before? ${this.youvisited}.`;
    alert(message);
  }
}
