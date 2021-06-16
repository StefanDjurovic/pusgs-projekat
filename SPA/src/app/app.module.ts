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
import { NewWorkRequestComponent } from './workRequest/newWorkRequest/newWorkRequest.component';
import { MapComponent } from './workRequest/map/map.component';
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
import { SortDirective } from './direrctive/sort.directive';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { WorkRequestService } from './_services/workRequest.service';
import { UserWorkRequestsResolver } from './_resolvers/userWorkRequests.resolver';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrewsComponent } from './crews/crews.component';

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
    NewWorkRequestComponent,
    MapComponent,
    IncidentsTableComponent,
    CallsTableComponent,
    CallReportComponent,
    SettingsComponent,
    WorkRequestFormComponent,
    WorkRequestsComponent,
    IconUpdateComponent,
    ChangePasswordComponent,
    PriorityAssignmentComponent,
    AddDeviceComponent,
    AllDevicesComponent,
    PaginationComponent,
    SortDirective,
    DashboardComponent,
    CrewsComponent
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
    BsDropdownModule.forRoot(),
    SocialLoginModule
  ],
  providers: [
    AuthService,
    WorkRequestService,
    ErrorInterceptorProvider,
    RegisterApplicationsResolver,
    UserWorkRequestsResolver,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '659260485501-mul4bbnvgh9mjbsijc8ald6esdmitg8k.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
