// import { Routes } from '@angular/router';

// export const routes: Routes = [];
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { AboutComponent } from './pages/about/about';
import { IndexComponent } from './pages/form/form';
import { AuthGuard } from '../guard';
import { AccueilComponent } from './pages/accueil/accueil';

// routes, les navigations
export const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
{ path: 'about', component: AboutComponent, canActivate: [AuthGuard]},
{ path: 'form', component: FormComponent, canActivate: [AuthGuard]},
{ path: '**', redirectTo: '' }
];
