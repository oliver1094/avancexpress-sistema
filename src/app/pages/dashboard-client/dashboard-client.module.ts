import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardClientComponent } from './dashboard-client.component';
import { routing }       from './dashboard-client.routing';
import { NgUploaderModule } from 'ngx-uploader';
import { TrafficChartService } from './trafficChart/trafficChart.service';
import { TrafficChart } from './trafficChart';
import { UiSwitchModule } from '../../../../node_modules/angular2-ui-switch/src';
import { GaugeModule } from 'ng2-gauge';


@NgModule({
  imports: [
    CommonModule,    
    ReactiveFormsModule,
    FormsModule,    
    routing,  
    NgUploaderModule ,
    UiSwitchModule,
    GaugeModule
  ],
  declarations: [
    DashboardClientComponent,
    TrafficChart,
    
  ],
  providers: [
    TrafficChartService
  ]
})
export class DashboardClientModule {}
