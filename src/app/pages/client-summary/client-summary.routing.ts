import { Routes, RouterModule } from '@angular/router';

import { ClientSummaryComponent } from './client-summary.component';

const routes: Routes = [
  {
    path: '',
    component: ClientSummaryComponent
  }
];

export const routing = RouterModule.forChild(routes);