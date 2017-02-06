import { NgModule } from '@angular/core';
import { WhyRoutingModule } from './why.routing';
import { CommonModule } from '@angular/common';

import { SinceDirective } from '../../shared/directives/since.directive';
import { SvgChartAnimateBarDirective } from '../../shared/svg-chart/svg-chart-animate-bar.directive';

import { WhyComponent } from './why.component';
import { SvgChartComponent } from '../../shared/svg-chart/svg-chart.component';
import { SvgHoldingComponet } from '../../shared/svg-chart/svg-holding.component';

import { ChartService } from '../../shared/services/chart.service';

@NgModule({
  imports: [
    WhyRoutingModule,
    CommonModule,
  ],
  declarations: [
    WhyComponent,
    SvgChartComponent,
    SvgHoldingComponet,
    SinceDirective,
    SvgChartAnimateBarDirective,
  ],
  providers: [
    ChartService
  ]
})
export class WhyModule {}
