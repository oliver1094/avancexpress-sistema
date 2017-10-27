import { Routes, RouterModule } from '@angular/router';

import { RegisterCompleteComponent } from './register-complete.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterCompleteComponent
  }
];

export const routing = RouterModule.forChild(routes);