import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultComponent } from './default/default.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationComponent } from './notification/notification.component';
import { RegisterApplicationsComponent } from './registerApplications/registerApplications.component';
import { RegisterApplicationsResolver } from './_resolvers/registerApplications.resolver';
import { NewWorkRequestComponent } from './workRequest/newWorkRequest/newWorkRequest.component';
import { MapComponent } from './workRequest/map/map.component';
import { IncidentsTableComponent } from './incidents/incidents-table/incidents-table.component';
import { CallsTableComponent } from './incidents/calls/calls-table/calls-table.component';
import { CallReportComponent } from './incidents/calls/call-report/call-report.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { WorkRequestsComponent } from './documents/work-requests/work-requests.component';
import { WorkRequestFormComponent } from './documents/work-request-form/work-request-form.component';
import { AllDevicesComponent } from './devices/all-devices/all-devices.component';
import { AddDeviceComponent } from './devices/add-device/add-device.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'newWorkRequest', component: NewWorkRequestComponent }, // route guard for unauth users
  { path: 'registerApplications', component: RegisterApplicationsComponent, resolve: { applications: RegisterApplicationsResolver } },
  { path: 'notifications', component: NotificationComponent },
  { path: 'map', component: MapComponent },
  { path: 'register-applications', component: RegisterApplicationsComponent, resolve: { applications: RegisterApplicationsResolver } },
  { path: 'notifications', component: NotificationComponent },
  { path: 'incidents', component: IncidentsTableComponent },
  { path: 'calls', component: CallsTableComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'documents', component: WorkRequestsComponent },
  { path: 'create-work-request', component: WorkRequestFormComponent },
  { path: 'all-devices', component: AllDevicesComponent },
  { path: 'add-device', component: AddDeviceComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
