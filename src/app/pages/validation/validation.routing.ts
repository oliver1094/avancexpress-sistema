import { Routes, RouterModule } from '@angular/router';

import { ValidationComponent } from './validation.component';

const routes: Routes = [
  {
    path: '',
    component: ValidationComponent
  }
];

export const routing = RouterModule.forChild(routes);