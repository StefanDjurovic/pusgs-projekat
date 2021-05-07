import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorInterceptorProvider } from './_services/error.interceptor';

import { AngularMaterialModule } from './shared/angular-material.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DefaultComponent } from './default/default.component';
import { AppRoutingModule } from './app-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { NotificationComponent } from './notification/notification.component';
import { RegisterApplicationsComponent } from './registerApplications/registerApplications.component';
import { RegisterApplicationsResolver } from './_resolvers/registerApplications.resolver';
import { IncidentsTableComponent } from './incidents/incidents-table/incidents-table.component';
import { CallsTableComponent } from './incidents/calls/calls-table/calls-table.component';
import { CallReportComponent } from './incidents/calls/call-report/call-report.component';
import { SettingsComponent } from './settings/settings.component';
import { WorkRequestsComponent } from './documents/work-requests/work-requests.component';
import { WorkRequestFormComponent } from './documents/work-request-form/work-request-form.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { PriorityAssignmentComponent } from './settings/priority-assignment/priority-assignment.component';
import { IconUpdateComponent } from './settings/icon-update/icon-update.component';
import { AddDeviceComponent } from './devices/add-device/add-device.component';
import { AllDevicesComponent } from './devices/all-devices/all-devices.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    ValueComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    HeaderComponent,
    SidebarComponent,
    DefaultComponent,
    ProfileComponent,
    NotificationComponent,
    RegisterApplicationsComponent,
    RegisterApplicationsComponent,
    IncidentsTableComponent,
    CallsTableComponent,
    CallReportComponent,
    SettingsComponent,
    WorkRequestsComponent,
    WorkRequestFormComponent,
    ChangePasswordComponent,
    PriorityAssignmentComponent,
    IconUpdateComponent,
    AddDeviceComponent,
    AllDevicesComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AppRoutingModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    RegisterApplicationsResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
