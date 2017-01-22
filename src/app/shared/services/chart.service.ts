import { Injectable } from "@angular/core"

@Injectable()
export class ChartService
{
  private dataKey;
  private dataPoints = {
    "dataPoints": [
      {
        percentage: 90,
        color: '#ffe12f',
        label: 'HTML'
      },
      {
        percentage: 95,
        color: '#edd54f',
        label: 'CSS'
      },
      {
        percentage: 92,
        color: '#ffe12f',
        label: 'Javascript'
      },
      {
        percentage: 85,
        color: '#edd54f',
        label: 'Angular'
      },
      {
        percentage: 80,
        color: '#ffe12f',
        label: 'UI/UX'
      },
      {
        percentage: 90,
        color: '#f5795f',
        label: 'Node.js'
      },
      {
        percentage: 95,
        color: '#f49f8f',
        label: 'PHP'
      },
      {
        percentage: 85,
        color: '#f5795f',
        label: 'Web frameworks'
      },
      {
        percentage: 75,
        color: '#f49f8f',
        label: 'Automation'
      },
      {
        percentage: 75,
        color: '#f5795f',
        label: 'Operating Systems'
      },
    ]
  };


  public getData ()
  {
    return this.dataPoints[this.dataKey];
  }

  public setDataKey (dataKey)
  {
    this.dataKey = dataKey;
  }
}
