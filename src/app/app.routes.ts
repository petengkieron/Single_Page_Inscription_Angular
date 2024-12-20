import { Routes } from '@angular/router';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { ConsultationComponent } from './components/consultation/consultation.component';
import { SuppressionComponent } from './components/suppression/suppression.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'inscription', 
    component: InscriptionComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'consultation', 
    component: ConsultationComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'suppression', 
    component: SuppressionComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
