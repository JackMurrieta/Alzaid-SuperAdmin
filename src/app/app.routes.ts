import { Routes } from '@angular/router';
import { EstanciasPageComponent } from './features/estancias/pages/estancias-page.component';
import { AUTH_ROUTES } from './features/auth/auth.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },

  {
    path: 'auth',
    children: AUTH_ROUTES
  },

  {
    path: 'estancias',
    component: EstanciasPageComponent,
  },
];