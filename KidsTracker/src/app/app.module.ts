import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './page-components/home/home.component';
import { AppRoutes } from './app.routes';
import { BsDropdownModule } from 'ngx-bootstrap';


import { AppComponent } from './app.component';
import { LoginComponent } from './page-components/login/login.component';
import { RegisterComponent } from './page-components/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
