import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { ValidationComponent } from './validation.component';
import { routing } from './validation.routing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,    
    routing
  ],
  declarations: [
    ValidationComponent,
    PdfViewerComponent
  ]  
})

export class ValidationModule {}