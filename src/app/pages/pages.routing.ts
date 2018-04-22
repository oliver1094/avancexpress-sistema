import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
// noinspection TypeScriptValidateTypes
import { AuthGuardService } from '../service/auth-guard.service';

// export function loadChildren(path) { return System.import(path); };
export const routes: Routes = [
  {
    path: 'home',
    loadChildren: 'app/pages/home/home.module#HomeModule'     
  },  
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  {
    path: 'register-complete',
    loadChildren: 'app/pages/register-complete/register-complete.module#RegisterCompleteModule',
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'pages',
    component: Pages,    
    children: [
      { path: '', redirectTo: 'register-complete', pathMatch: 'full' },
      { path: 'dash-client/:id', loadChildren: './dashboard-client/dashboard-client.module#DashboardClientModule', canActivateChild: [AuthGuardService] },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },      
      { path: 'validations', loadChildren: './validations/validations.module#ValidationsModule' },
      { path: 'client-summary',  loadChildren: './client-summary/client-summary.module#ClientSummaryModule' },
      { path: 'editors', loadChildren: './editors/editors.module#EditorsModule' },
      { path: 'components', loadChildren: './components/components.module#ComponentsModule' },
      { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
      { path: 'ui', loadChildren: './ui/ui.module#UiModule' },
      { path: 'forms', loadChildren: './forms/forms.module#FormsModule' },
      { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
      { path: 'maps', loadChildren: './maps/maps.module#MapsModule' }
    ],
    canActivate: [ AuthGuardService ]    
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
