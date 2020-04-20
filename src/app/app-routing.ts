/**
 * Title: app.routing.ts
 * Authors: Group 4
 * Description: bcrs
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { UnauthorizedComponent } from './pages/error/unauthorized/unauthorized.component';
import { InternalServerComponent } from './pages/error/internal-server/internal-server.component';
import { NotFoundComponent } from './pages/error/not-found/not-found.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthorizationGuard } from './guards/authorization.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent },
  {
    path: 'admin',
    children: [{ path: 'users', component: UsersComponent, canActivate: [AuthenticationGuard, AuthorizationGuard] }],
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
