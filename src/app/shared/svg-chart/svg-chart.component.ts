import { Component, Input, ElementRef, ViewEncapsulation, OnInit, OnChanges } from '@angular/core';
import { AbstractSvgChartComponent } from './abstract-svg-chart';
import { ChartService } from '../../shared/services/chart.service';

@Component({
  selector: 'svg-chart',
  templateUrl: './svg-chart.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`svg-chart { display: block; width: 100%; }`],
})
export class SvgChartComponent extends AbstractSvgChartComponent implements OnInit, OnChanges {
  public colWidth;
  public data;
  public chartService;
  @Input('ratioWidth') ratioWidth: string;
  @Input('ratioHeight') ratioHeight: string;
  @Input('dataKey') dataKey: any;
  @Input('gutterWidth') gutterWidth: number = 60;
  @Input('barColor') barColor: 'rgb(255, 255, 255)';

  // listen to window width changes
  get padding () { return this.gutterWidth / (+this.data.length) * this.inputRatioWidth; }
  get barHeights () { return this.data; }
  get inputRatioWidth () { return +this.ratioWidth; }
  get inputRatioHeight () { return +this.ratioHeight; }

  constructor(elm: ElementRef, chartService: ChartService) {
    super(elm.nativeElement);
    this.chartService = chartService;
  }

  ngOnInit() {
    this.chartService.setDataKey(this.dataKey);
    this.data = this.chartService.getData(this.dataKey);
    this.colWidth = 'width: ' + 100 / this.data.length + '%;';
    this.initialize();
  }

  ngOnChanges() {
    this.initialize();
  }
}
