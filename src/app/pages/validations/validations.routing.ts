import { Routes, RouterModule } from '@angular/router';

import { Validations } from './validations.component';
import { ValidationComponent } from './components/validation/validation.component';
import { ValidationFirstComponent } from './components/validation-first/validation-first.component';
import { ValidationSecondComponent } from './components/validation-second/validation-second.component';
import { ValidationFourComponent } from './components/validation-four/validation-four.component';
import { ValidationFiveComponent } from './components/validation-five/validation-five.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Validations,
    children: [
      { path: 'validation', component: ValidationComponent },
      { path: 'validation-first', component: ValidationFirstComponent },
      { path: 'validation-second', component: ValidationSecondComponent },
      { path: 'validation-four', component: ValidationFourComponent },
      { path: 'validation-five', component: ValidationFiveComponent },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
