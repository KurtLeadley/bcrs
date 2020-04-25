import { Component, OnInit, Renderer2, HostListener, Inject } from '@angular/core';
import { Location, DOCUMENT } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'bcrs';

  constructor(
    private renderer: Renderer2,
    public location: Location,
    @Inject(DOCUMENT) document,
    private auth: AuthService
  ) {}
  // Used to change the class of the navbar on scroll
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    if (window.pageYOffset > 200) {
      const element = document.getElementById('navbar-top');
      if (element) {
        element.classList.remove('navbar-transparent');
        element.classList.add('bg-primary');
      }
    } else {
      const element = document.getElementById('navbar-top');
      if (element) {
        element.classList.add('navbar-transparent');
        element.classList.remove('bg-primary');
      }
    }
  }

  ngOnInit() {
    this.auth.autoAuthUser();
    this.onWindowScroll(Event);
  }
}
