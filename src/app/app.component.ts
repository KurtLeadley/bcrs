import { Component, OnInit, Renderer2, HostListener, Inject, OnDestroy } from '@angular/core';
import { Location, DOCUMENT } from '@angular/common';
import { AuthService } from './services/auth.service';

let lastScrollTop = 0;
const delta = 5;
const navbarHeight = 0;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
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

  hasScrolled() {
    const st = window.pageYOffset;
    if (Math.abs(lastScrollTop - st) <= delta) {
      return;
    }
    const navbar = document.getElementById('navbar-top');
    if (st > lastScrollTop && st > navbarHeight) {
      if (navbar) {
        if (navbar.classList.contains('nav-down')) {
          navbar.classList.remove('nav-down');
          navbar.classList.add('nav-up');
        }
      }
    } else {
      if (st + window.innerHeight < document.body.scrollHeight) {
        if (navbar) {
          if (navbar.classList.contains('nav-up')) {
            navbar.classList.remove('nav-up');
            navbar.classList.add('nav-down');
          }
        }
      }
    }

    lastScrollTop = st;
  }

  ngOnInit() {
    this.auth.autoAuthUser();
    this.onWindowScroll(Event);
    const navbar = document.getElementById('navbar-top');
    navbar.classList.add('nav-down');
    this.hasScrolled();
  }

  ngOnDestroy() {
    const navbar = document.getElementById('navbar-top');
    navbar.classList.remove('nav-down');
    navbar.classList.remove('nav-up');
  }
}
