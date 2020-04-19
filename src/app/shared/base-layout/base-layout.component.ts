import { Component, OnInit, OnDestroy, OnChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import {
  faWrench,
  faFileInvoice,
  faQuestionCircle,
  faTasks,
  faUser,
  faUserPlus,
  faChartPie,
  faAddressBook,
  faInfo,
  faHome,
  faSignInAlt,
  faSignOutAlt,
  faUserCircle,
  faPollH,
} from '@fortawesome/free-solid-svg-icons';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { Loader } from '../../models/loader.model';
import { MatSidenav } from '@angular/material/sidenav';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css'],
})
export class BaseLayoutComponent implements OnInit, OnDestroy, OnChanges {
  show = false;
  imageUrl: string;
  showAvatar = false;
  private sub: Subscription;

  faWrench = faWrench;
  faFileInvoice = faFileInvoice;
  faQuestion = faQuestionCircle;
  faTasks = faTasks;
  faUser = faUser;
  faUserPlus = faUserPlus;
  faChartPie = faChartPie;
  faAddressBook = faAddressBook;
  faInfo = faInfo;
  faHome = faHome;
  faUserCircle = faUserCircle;
  faSignOutAlt = faSignOutAlt;
  faSignInAlt = faSignInAlt;
  faPollH = faPollH;
  year: number = Date.now();
  badgeCount: number;
  userIsAuthenticated = false;
  username: string;
  role: string;
  securityAnswersExist = false;
  usernameExist = true;
  userObjId: string = '';
  private authListenerSubs: Subscription;

  @ViewChild('sidenav') public sideNav: MatSidenav;

  constructor(
    private auth: AuthService,
    private loaderService: LoaderService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private userService: UserService
  ) {
    this.router.events.subscribe((event) => {
      //subscribe to every routing event that takes place for manipulation of data
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

      if (event instanceof NavigationEnd) {
        //handle nav end
        this.sideNav.close();
      }

      if (event instanceof NavigationError) {
        //handle routing errors
        //console.log(event.error);
      }
    });
  }
  ngAfterContentChecked() {}
  ngOnInit() {
    //created subscriptions for observables so they can be destroyed to prevent memory leaks
    this.userIsAuthenticated = this.auth.getIsAuthenticated(); //check user is authenticated and store in a var that will be used on frontend to display/hide certain features
    this.authListenerSubs = this.auth.getAuthStatusListener().subscribe((isAuthenticated) => {
      //repopulate values on listener change
      this.userIsAuthenticated = isAuthenticated;
      this.username = this.auth.getUsername();
      this.role = this.auth.getCurrentRole();
    });
    this.sub = this.loaderService.loaderState.subscribe((state: Loader) => {
      this.show = state.show;

      this.cdRef.detectChanges();
    });
  }

  ngAfterContentInit() {}

  ngOnChanges() {
    this.username = this.auth.getUsername();
  }

  onLogout() {
    //log user out
    this.auth.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
