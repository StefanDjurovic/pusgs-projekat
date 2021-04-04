import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultComponent } from './default/default.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationComponent } from './notification/notification.component';
import { RegisterApplicationsComponent } from './registerApplications/registerApplications.component';
import { RegisterApplicationsResolver } from './_resolvers/registerApplications.resolver';


const routes: Routes = [
  { path: 'home', redirectTo: '' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'registerApplications', component: RegisterApplicationsComponent, resolve: { applications: RegisterApplicationsResolver } },
  { path: 'notifications', component: NotificationComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
