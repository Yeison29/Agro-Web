import { Routes } from '@angular/router';
import { HomeComponent } from './home/pages/home/home.component';
import { ServicesComponent } from './home/pages/services/services.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo:'/home'},
    { path: 'home', component: HomeComponent },
    { path: 'services', component: ServicesComponent },
];
