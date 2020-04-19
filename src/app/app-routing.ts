/**
 * Title: app.routing.ts
 * Authors: Group 4
 * Description: bcrs
 */
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { UnauthorizedComponent } from './pages/error/unauthorized/unauthorized.component';
import { InternalServerComponent } from './pages/error/internal-server/internal-server.component';
import { NotFoundComponent } from './pages/error/not-found/not-found.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthorizationGuard } from './guards/authorization.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    children: [
      // redirect to home
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      {
        path: 'admin',
        children: [
          { path: 'users', component: UsersComponent, canActivate: [AuthenticationGuard, AuthorizationGuard] },
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
    ],
  },
];
