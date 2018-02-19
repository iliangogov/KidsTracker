import { Routes } from '@angular/router';
import { HomeComponent } from './page-components/home/home.component';
import { LoginComponent } from './page-components/login/login.component';
import { RegisterComponent } from './page-components/register/register.component';
import { SelectRoleComponent } from './page-components/select-role/select-role.component';
import { MapComponent } from './page-components/map/map.component';
import { AddKidComponent } from './page-components/add-kid/add-kid.component';
import { TrackerComponent } from './page-components/tracker/tracker.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'select-role', component: SelectRoleComponent },
    { path: 'map', component: MapComponent },
    { path: 'add-kid', component: AddKidComponent },
    { path: 'tracker/:kidname', component: TrackerComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

export const AppRoutes = appRoutes;
