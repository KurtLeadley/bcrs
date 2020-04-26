/**
 * Title: app.routing.ts
 * Authors: Group 4
 * Description: bcrs
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { UnauthorizedComponent } from './pages/error/unauthorized/unauthorized.component';
import { InternalServerComponent } from './pages/error/internal-server/internal-server.component';
import { NotFoundComponent } from './pages/error/not-found/not-found.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthorizationGuard } from './guards/authorization.guard';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { SecurityQuestionsComponent } from './pages/admin/security-questions/security-questions.component';
import { FeaturesComponent } from './pages/features/features.component';
import { RolesComponent } from './pages/admin/roles/roles.component';
import { PurchasesGraphComponent } from './pages/admin/purchases-graph/purchases-graph.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact-us', component: ContactUsComponent },
  {
    path: 'admin',
    children: [
      { path: 'users', component: UsersComponent, canActivate: [AuthenticationGuard, AuthorizationGuard] },
      {
        path: 'security-questions',
        component: SecurityQuestionsComponent,
        canActivate: [AuthenticationGuard, AuthorizationGuard],
      },
      {
        path: 'purchases-graph',
        component: PurchasesGraphComponent,
        // canActivate: [AuthenticationGuard, AuthorizationGuard],
      },
      {
        path: 'roles',
        component: RolesComponent,
        canActivate: [AuthenticationGuard, AuthorizationGuard],
      },
    ],
  },
  {
    path: 'error',
    children: [
      { path: '401', component: UnauthorizedComponent },
      { path: '500', component: InternalServerComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      useHash: true,
      enableTracing: false,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
