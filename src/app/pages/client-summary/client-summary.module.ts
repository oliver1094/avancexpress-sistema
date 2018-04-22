import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { ClientSummaryComponent } from './client-summary.component';
import { routing } from './client-summary.routing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,    
    routing
  ],
  declarations: [
    ClientSummaryComponent
  ]  
})

export class ClientSummaryModule {}