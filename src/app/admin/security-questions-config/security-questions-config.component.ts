import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-security-questions-config',
  templateUrl: './security-questions-config.component.html',
  styleUrls: ['./security-questions-config.component.css']
})
export class SecurityQuestionsConfigComponent implements OnInit {

  loadCreateSecurityComponent = false;
  loadListSecurityComponent = false;

  constructor() { }

  ngOnInit(): void {
  }
  showCreateSecurityComponent() {
    this.loadCreateSecurityComponent = true;
    this.loadListSecurityComponent = false;
  }
  showListSecurityComponent() {
    this.loadCreateSecurityComponent = false;
    this.loadListSecurityComponent = true;
  }
}
