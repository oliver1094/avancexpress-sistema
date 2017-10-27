import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { RegisterCompleteComponent } from './register-complete.component';
import { routing } from './register-complete.routing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { DefaultModal } from '../ui/components/modals/default-modal/default-modal.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    NgbModalModule,
    routing
  ],
  declarations: [
    RegisterCompleteComponent,
    DefaultModal
  ],
  entryComponents: [
    DefaultModal
  ],
})

export class RegisterCompleteModule {}