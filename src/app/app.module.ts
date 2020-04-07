import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { SecurityQuestionsConfigComponent } from './admin/security-questions-config/security-questions-config.component';
import { UsersConfigComponent } from './admin/users-config/users-config.component';
import { CreateUserComponent } from './admin/users-config/create-user/create-user.component';
import { ListUsersComponent } from './admin/users-config/list-users/list-users.component';
import { CreateSecurityQuestionComponent } from './admin/security-questions-config/create-security-question/create-security-question.component';
import { ListSecurityQuestionsComponent } from './admin/security-questions-config/list-security-questions/list-security-questions.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { DropdownDirective } from './dropdown.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    SecurityQuestionsConfigComponent,
    UsersConfigComponent,
    CreateUserComponent,
    ListUsersComponent,
    CreateSecurityQuestionComponent,
    ListSecurityQuestionsComponent,
    NotFoundComponent,
    DropdownDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
