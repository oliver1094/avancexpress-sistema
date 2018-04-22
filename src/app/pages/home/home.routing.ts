import { Routes, RouterModule } from '@angular/router';

import { Home } from './home.component';
import { IndexComponent } from './index/index.component';
import { QuestionComponent } from './question/question.component';
import { PrivacityComponent } from './privacity/privacity.component';
import { RegisterComponent } from './register/register.component';
import { RegisterSecondComponent } from './register-second/register-second.component';
import { RegisterThirdComponent } from './register-third/register-third.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { RegisterEndComponent } from './register-end/register-end.component';
import { PreRegisterComponent } from './pre-register/pre-register.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuardService } from '../../service/auth-guard.service';
import { PreventUnsavedChangesGuard } from '../../service/unsaved-changes.service';
import { CanDeactivateGuard } from '../../service/can-deactive.guard';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Home,
    children: [
      { path: 'inicio', component: IndexComponent },
      { path: 'preguntas-frecuentes', component: QuestionComponent },
      { path: 'aviso-privacidad', component: PrivacityComponent },
      { path: 'register', component: PreRegisterComponent, canDeactivate: [ CanDeactivateGuard ]  },
      { path: 'register-second', component: RegisterSecondComponent, canActivate: [AuthGuardService], canDeactivate: [ CanDeactivateGuard ] },
      { path: 'register-third', component: RegisterThirdComponent, canDeactivate: [ CanDeactivateGuard ] },
      { path: 'subir-archivos', component: UploadFilesComponent },
      { path: 'register-end', component: RegisterEndComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'inicio' },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

