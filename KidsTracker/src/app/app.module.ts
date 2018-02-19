import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './page-components/home/home.component';
import { AppRoutes } from './app.routes';
import { BsDropdownModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule, ToasterService } from 'angular2-toaster';


import { AppComponent } from './app.component';
import { LoginComponent } from './page-components/login/login.component';
import { RegisterComponent } from './page-components/register/register.component';

import { AuthenticationService } from './services/authentication.service';
import { SelectRoleComponent } from './page-components/select-role/select-role.component';
import { MapComponent } from './page-components/map/map.component';
import { AddKidComponent } from './page-components/add-kid/add-kid.component';
import { TrackerComponent } from './page-components/tracker/tracker.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    SelectRoleComponent,
    MapComponent,
    AddKidComponent,
    TrackerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    ToasterModule.forRoot()
  ],
  providers: [
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
