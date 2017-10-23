import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Home } from './home.component';
import { routing }       from './home.routing';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { MyDatePickerModule } from 'mydatepicker';


@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2PageScrollModule,
    IonRangeSliderModule,
    MyDatePickerModule
  ],
  declarations: [
    Home
  ]
})
export class HomeModule {}
