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
import { UnitsComponent } from './units/units.component';
import { UnitService } from './_services/unit.service';
import { UnitsResolver } from './_resolvers/units.resolver';
import { MatCardModule } from '@angular/material/card';
import { UnitsFormComponent } from './unitsForm/unitsForm.component';
import { GeneralMapComponent } from './generalMap/generalMap.component';
import { UnitEditComponent } from './unitEdit/unitEdit.component';
import { UnitDetailsResolver } from './_resolvers/unitDetails';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AvailableMembersResolver } from './_resolvers/availableMembers.resolver';
import { WorkRequestResolver } from './_resolvers/workRequest.resolver';
import { JwtModule } from '@auth0/angular-jwt';
import { WorkRequestsResolver } from './_resolvers/workRequests.resolver';


export function tokenGetter() {
  return localStorage.getItem('token');
}

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
    UnitsComponent,
    UnitsFormComponent,
      GeneralMapComponent,
      UnitEditComponent
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
    SocialLoginModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    JwtModule.forRoot({
      config: {
         tokenGetter: tokenGetter,
         allowedDomains: ['localhost:5000'],
         disallowedRoutes: ['localhost:5000/api/auth']
      }
   })
  ],
  providers: [
    AuthService,
    WorkRequestService,
    ErrorInterceptorProvider,
    RegisterApplicationsResolver,
    UserWorkRequestsResolver,
    UnitService,
    UnitsResolver,
    UnitDetailsResolver,
    AvailableMembersResolver,
    WorkRequestResolver,
    WorkRequestsResolver,
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
