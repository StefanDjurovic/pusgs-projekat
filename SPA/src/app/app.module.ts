import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AppRoutingModule
    FormsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [AuthService, ErrorInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
