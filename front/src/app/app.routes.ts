import { Routes } from '@angular/router';
import { HomeComponent } from './home/pages/home/home.component';
import { LoginComponent } from './home/components/login/login.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo:'/home'},
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
];
