/**
 * Title: pages/home/home.component.ts
 * Authors: Group 4
 * Description: bcrs
 */
// this is my heroku project (kurt leadley)
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
  }
}
