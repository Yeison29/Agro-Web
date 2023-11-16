import { Routes } from '@angular/router';
import { HomeComponent } from './home/pages/home/home.component';
import {StatisticsComponent} from "./home/pages/statistics/statistics.component";

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo:'/home'},
    { path: 'home', component: HomeComponent },
  { path: 'statistics', component: StatisticsComponent },
];
