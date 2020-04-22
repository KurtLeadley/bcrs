import { Component, OnInit, OnDestroy, OnChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { Loader } from '../../models/loader.model';
import { MatSidenav } from '@angular/material/sidenav';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
})
export class BaseLayoutComponent implements OnInit, OnDestroy, OnChanges {
  show = false;
  imageUrl: string;
  showAvatar = false;
  isCollapsed = true;
  autoclose = false;
  private sub: Subscription;

  year: number = Date.now();
  badgeCount: number;
  userIsAuthenticated = false;
  username: string;
  role: string;
  securityAnswersExist = false;
  usernameExist = true;
  userObjId = '';
  private authListenerSubs: Subscription;

  @ViewChild('sidenav') public sideNav: MatSidenav;

  constructor(
    private auth: AuthService,
    private loaderService: LoaderService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private userService: UserService
  ) {
    router.events.subscribe((event) => {
      this.autoclose = true;
      this.isCollapsed = true;
      // subscribe to every routing event that takes place for manipulation of data
      if (event instanceof NavigationStart) {
        this.username = auth.getUsername();
        this.role = auth.getCurrentRole();
        if (this.username !== null && this.username !== '' && this.username !== undefined) {
          this.usernameExist = true;
          this.auth.checkIfSecurityAnswersExistsObservable(this.username).subscribe((response) => {
            this.securityAnswersExist = response;
          });
        } else {
          this.usernameExist = false;
        }
        this.userObjId = this.auth.getUserObjId();
        if (this.userObjId !== null && this.userObjId !== undefined) {
          this.userService.getUser(this.userObjId).subscribe((user) => {
            if (user.avatar !== null && user.avatar !== undefined) {
              this.showAvatar = true;
              this.imageUrl = user.avatar;
            } else {
              this.showAvatar = false;
              this.imageUrl = null;
            }
          });
        } else {
          this.showAvatar = false;
          this.imageUrl = null;
        }
      }
    });
  }

  ngOnInit() {
    // created subscriptions for observables so they can be destroyed to prevent memory leaks
    this.userIsAuthenticated = this.auth.getIsAuthenticated();
    this.authListenerSubs = this.auth.getAuthStatusListener().subscribe((isAuthenticated) => {
      // repopulate values on listener change
      this.userIsAuthenticated = isAuthenticated;
      this.username = this.auth.getUsername();
      this.role = this.auth.getCurrentRole();
    });
    this.sub = this.loaderService.loaderState.subscribe((state: Loader) => {
      this.show = state.show;

      this.cdRef.detectChanges();
    });
  }

  ngOnChanges() {
    this.username = this.auth.getUsername();
  }

  onLogout() {
    // log user out
    this.auth.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
