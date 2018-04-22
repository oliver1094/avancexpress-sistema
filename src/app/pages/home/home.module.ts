import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Home } from './home.component';
import { routing }       from './home.routing';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { PreRegisterComponent } from './pre-register/pre-register.component';
import { MyDatePickerModule } from 'mydatepicker';
import { UiSwitchModule } from '../../../../node_modules/angular2-ui-switch/src';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { ScrollSpyModule } from 'ngx-scrollspy';
import { ScrollEventModule } from 'ngx-scroll-event';
import { Ng2TrackScrollModule } from 'ng2-track-scroll';
import { NavbarComponent } from './navbar/navbar.component'; // <-- import the module
import { Login } from './login/login.component';
import { QuestionComponent } from './question/question.component';
import { PrivacityComponent } from './privacity/privacity.component';
import { FooterComponent } from './footer/footer.component';
import { IndexComponent } from './index/index.component';
import { RegisterComponent } from './register/register.component';
import { RegisterSecondComponent } from './register-second/register-second.component';
import { RegisterThirdComponent } from './register-third/register-third.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { NgUploaderModule } from 'ngx-uploader';
import { RegisterEndComponent } from './register-end/register-end.component';

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
    MyDatePickerModule,
    UiSwitchModule,
    CurrencyMaskModule,
    ScrollEventModule,
    ScrollSpyModule.forRoot(),
    Ng2TrackScrollModule.forRoot(), // <-- include it in your app module
    NgUploaderModule
  ],  
  declarations: [
    Home,
    PreRegisterComponent,
    NavbarComponent,
    Login,
    QuestionComponent,
    PrivacityComponent,
    FooterComponent,
    IndexComponent,
    RegisterComponent,
    RegisterSecondComponent,
    RegisterThirdComponent,
    UploadFilesComponent,
    RegisterEndComponent
  ]
})
export class HomeModule {}
