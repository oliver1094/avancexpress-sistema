import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routing } from './validations.routing';
import { Validations } from './validations.component';
import { ValidationComponent } from './components/validation/validation.component';
import { ValidationFirstComponent } from './components/validation-first/validation-first.component';
import { ValidationSecondComponent } from './components/validation-second/validation-second.component';
import { ValidationFourComponent } from './components/validation-four/validation-four.component';
import { ValidationFiveComponent } from './components/validation-five/validation-five.component';
import { DataClientComponent } from './components/data-client/data-client.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MyDatePickerModule } from 'mydatepicker';
import { NgUploaderModule } from 'ngx-uploader';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    HttpModule,
    routing,
    MyDatePickerModule,
    NgUploaderModule,
    PdfViewerModule
  ],
  declarations: [
    Validations,    
    ValidationComponent,
    ValidationFirstComponent,
    ValidationSecondComponent,
    ValidationFourComponent,
    DataClientComponent,
    ValidationFiveComponent
  ],
  providers: [
  ]
})
export class ValidationsModule {
}
