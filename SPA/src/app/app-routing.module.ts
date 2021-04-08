import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultComponent } from './default/default.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationComponent } from './notification/notification.component';
import { RegisterApplicationsComponent } from './registerApplications/registerApplications.component';
import { RegisterApplicationsResolver } from './_resolvers/registerApplications.resolver';
import { IncidentsTableComponent } from './incidents/incidents-table/incidents-table.component';
import { CallsTableComponent } from './incidents/calls/calls-table/calls-table.component';
import { CallReportComponent } from './incidents/calls/call-report/call-report.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'registerApplications', component: RegisterApplicationsComponent, resolve: { applications: RegisterApplicationsResolver } },
  { path: 'notifications', component: NotificationComponent },
  { path: 'incidents', component: IncidentsTableComponent },
  { path: 'calls', component: CallsTableComponent },
  { path: 'new-call', component: CallReportComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
