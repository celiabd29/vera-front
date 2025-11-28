// import { Routes } from '@angular/router';

// export const routes: Routes = [];
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';

import { AboutComponent } from './pages/about/about';
import { FormComponent } from './pages/form/form';
import { IndexComponent } from './pages/index/index';
import { AuthGuard } from '../guard';

// routes, les navigations
export const routes: Routes = [
{ path: '', component: IndexComponent },
{ path: 'home', component: HomeComponent, canActivate: [AuthGuard]},

// { path: 'home', component: HomeComponent },
{ path: 'about', component: AboutComponent, canActivate: [AuthGuard]},
{ path: 'form', component: FormComponent, canActivate: [AuthGuard]},
{ path: '**', redirectTo: '' }
];
