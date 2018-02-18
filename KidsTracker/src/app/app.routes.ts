import { Routes } from '@angular/router';
import { HomeComponent } from './page-components/home/home.component';
import { LoginComponent } from './page-components/login/login.component';
import { RegisterComponent } from './page-components/register/register.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

export const AppRoutes = appRoutes;
