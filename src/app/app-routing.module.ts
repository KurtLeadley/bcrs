import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component'
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UsersConfigComponent } from './admin/users-config/users-config.component';
import { SecurityQuestionsConfigComponent } from './admin/security-questions-config/security-questions-config.component';
import { CreateUserComponent } from './admin/users-config/create-user/create-user.component';
import { ListUsersComponent } from './admin/users-config/list-users/list-users.component';
import { CreateSecurityQuestionComponent } from './admin/security-questions-config/create-security-question/create-security-question.component';
import { ListSecurityQuestionsComponent } from './admin/security-questions-config/list-security-questions/list-security-questions.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/users', component: UsersConfigComponent, children: [
    { path: 'list-users', component: ListUsersComponent },
    { path: 'create-user', component: CreateUserComponent },
    { path: 'edit-user/:id', component: CreateUserComponent }
  ] },
  { path: 'admin/security', component: SecurityQuestionsConfigComponent, children: [
    { path: 'list-security', component: ListSecurityQuestionsComponent },
    { path: 'create-security', component: CreateSecurityQuestionComponent },
    { path: 'edit-security/:id', component: CreateSecurityQuestionComponent}
  ] },
  { path: '**', pathMatch: "full", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
