import { Routes, RouterModule } from '@angular/router';
import { Cupones } from './cupones.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Cupones,
    children: [
      /*{ path: 'validation', component: ValidationComponent },
      { path: 'validation-first', component: ValidationFirstComponent },
      { path: 'validation-second', component: ValidationSecondComponent }      */
    ]
  }
];

export const routing = RouterModule.forChild(routes);
