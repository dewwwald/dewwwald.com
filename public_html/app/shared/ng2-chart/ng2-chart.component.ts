import { Component, OnInit, Input } from '@angular/core';
import { Ng2ChartService } from './ng2-chart.service';

@Component({
  selector: 'unique-ng2-chart',
  templateUrl: 'app/shared/ng2-chart/ng2-chart.template.html',
  providers: [
    Ng2ChartService,
  ]
})
export class UniqueNg2ChartComponent implements OnInit {
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartType:string = 'bar';
  public barChartLegend:boolean = false;
  public barDefaultColor:string[] = [
    'rgba(255, 255, 255, 1)',
    'rgba(255, 255, 255, 1)'
  ];

  public barChartLabels:string[] = [];
  public barChartData:any[] = [];

  @Input('dataKey') dataKey:string;

  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  ngOnInit ()
  {
    this.chartService.retrieveData(this.dataKey);
    this.barChartLabels = this.chartService.getLabels();
    this.barChartData =  this.chartService.getData();
  }

  constructor (private chartService: Ng2ChartService)
  {}
}
