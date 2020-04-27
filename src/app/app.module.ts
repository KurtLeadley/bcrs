/**
 * Title: app.module.ts
 * Authors: Group 4
 * Description: bcrs
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TabViewModule } from 'primeng/tabview';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';

// ngx-bootstrap
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AlertModule } from 'ngx-bootstrap/alert';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
// other thrid parties
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { TagInputModule } from 'ngx-chips';
import { ChartModule } from 'primeng/chart';

import { AppRoutingModule } from './app-routing';
import { AppComponent } from './app.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { UnauthorizedComponent } from './pages/error/unauthorized/unauthorized.component';
import { InternalServerComponent } from './pages/error/internal-server/internal-server.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthorizationGuard } from './guards/authorization.guard';
import { HttpJwtInterceptor } from './interceptors/http-jwt.interceptor';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { SecurityQuestionsComponent } from './pages/admin/security-questions/security-questions.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NotFoundComponent } from './pages/error/not-found/not-found.component';
import { RolesComponent } from './pages/admin/roles/roles.component';
import { UsersDialogComponent } from './pages/admin/users/users-dialog/users-dialog.component';
import { SecurityQuestionsDialogComponent } from './pages/admin/security-questions/security-questions-dialog/security-questions-dialog.component';
import { RolesDialogComponent } from './pages/admin/roles/roles-dialog/roles-dialog.component';
import { FeaturesComponent } from './pages/features/features.component';
import { PurchasesGraphComponent } from './pages/admin/purchases-graph/purchases-graph.component';
import { ServicesComponent } from './pages/admin/services/services.component';
import { ServicesDialogComponent } from './pages/admin/services/services-dialog/services-dialog.component';

import { ProfileComponent } from './pages/profile/profile.component';
import { PictureUploadComponent } from './shared/picture-upload/picture-upload.component';
import { ServiceRepairComponent } from './pages/service-repair/service-repair.component';
import { ServiceRepairDialogComponent } from './pages/service-repair/service-repair-dialog/service-repair-dialog.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { AdminInvoicesComponent } from './pages/admin/invoices/admin-invoices.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    HomeComponent,
    FeaturesComponent,
    AboutComponent,
    ContactUsComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    UsersDialogComponent,
    SecurityQuestionsComponent,
    SecurityQuestionsDialogComponent,
    UnauthorizedComponent,
    NotFoundComponent,
    InternalServerComponent,
    ForgotPasswordComponent,
    FooterComponent,
    RolesComponent,
    RolesDialogComponent,
    PurchasesGraphComponent,
    ServicesComponent,
    ServicesDialogComponent,
    ProfileComponent,
    PictureUploadComponent,
    ServiceRepairComponent,
    ServiceRepairDialogComponent,
    InvoicesComponent,
    AdminInvoicesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatStepperModule,
    MatSortModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatExpansionModule,
    TabViewModule,
    MatSlideToggleModule,
    MatTabsModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    TimepickerModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    JwBootstrapSwitchNg2Module,
    AngularMultiSelectModule,
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    TagInputModule,
    ChartModule,
  ],
  providers: [
    AuthenticationGuard,
    AuthorizationGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpJwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
