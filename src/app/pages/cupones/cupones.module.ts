import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routing } from './cupones.routing';
import { Cupones } from './cupones.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    HttpModule,
    routing    
  ],
  declarations: [    
    Cupones
  ],
  providers: [
  ]
})
export class ValidationsModule {
}
