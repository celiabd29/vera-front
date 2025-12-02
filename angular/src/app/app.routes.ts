import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil';
import { ChatComponent } from './pages/chat/chat';
import { IndexComponent } from './pages/form/form';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { AuthGuard } from '../guard';
import { MentionLegaleComponent } from './pages/mention-legale/mention-legale';
import { PolitiqueConfidentialiteComponent } from './pages/politique-confidentialite/politique-confidentialite';

// routes, les navigations
export const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'form', component: IndexComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'mention-legale', component: MentionLegaleComponent },
  { path: 'politique-confidentialite', component: PolitiqueConfidentialiteComponent },
  { path: '**', redirectTo: '' },
];
