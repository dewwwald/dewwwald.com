import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { WhyRoutingModule } from './why.routing';

import { SinceDirective } from '../../shared/directives/since.directive';

import { UniqueNg2ChartComponent } from '../../shared/ng2-chart/ng2-chart.component';
import { WhyComponent } from './why.component';

import { Ng2ChartService } from '../../shared/ng2-chart/ng2-chart.service';

@NgModule({
  imports: [
    WhyRoutingModule,
    ChartsModule,
  ],
  declarations: [
    WhyComponent,
    SinceDirective,
    UniqueNg2ChartComponent,
  ],
  providers: [
    Ng2ChartService
  ]
})
export class WhyModule {}
