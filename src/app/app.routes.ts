import { Routes } from '@angular/router';
import { EstanciasPageComponent } from './features/estancias/pages/estancias-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'estancias',
    pathMatch: 'full',
  },
  {
    path: 'estancias',  // sin la /
    component: EstanciasPageComponent,
  },
];