import { Routes, RouterModule } from '@angular/router';

import { DashboardClientComponent } from './dashboard-client.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardClientComponent
  }
];

export const routing = RouterModule.forChild(routes);