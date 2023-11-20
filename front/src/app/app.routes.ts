import { Routes } from '@angular/router';
import { HomeComponent } from './home/pages/home/home.component';
import { ServicesComponent } from './home/pages/services/services.component';
import {  StatisticsComponent } from "./home/pages/statistics/statistics.component";
import { LoginComponent } from './home/components/login/login.component';
import {FarmersComponent} from "./home/pages/farmers/farmers.component";

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo:'/home'},
    { path: 'home', component: HomeComponent },
    { path: 'services', component: ServicesComponent },
    { path: 'statistics', component: StatisticsComponent },
    { path: 'login', component: LoginComponent },
  { path: 'farmers', component: FarmersComponent },
];
