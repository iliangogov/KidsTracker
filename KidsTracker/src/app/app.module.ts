import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './page-components/home/home.component';
import { AppRoutes } from './app.routes';
import { BsDropdownModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { environment } from '../environments/environment';


import { AppComponent } from './app.component';
import { LoginComponent } from './page-components/login/login.component';
import { RegisterComponent } from './page-components/register/register.component';

import { AuthenticationService } from './services/authentication.service';
import { SocketioService } from './services/socketio.service';
import { SelectRoleComponent } from './page-components/select-role/select-role.component';
import { MapComponent } from './page-components/map/map.component';
import { AddKidComponent } from './page-components/add-kid/add-kid.component';
import { TrackerComponent } from './page-components/tracker/tracker.component';

const socketConfig: SocketIoConfig = { url: environment.socketUrl, options: {} };


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
    ToasterModule.forRoot(),
    SocketIoModule.forRoot(socketConfig),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBUNOpKQmGUbyUscx6cY9ElcEXLxws66ac'
    })
  ],
  providers: [
    AuthenticationService,
    SocketioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
