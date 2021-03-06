import { Injectable } from "@angular/core"

@Injectable()
export class ChartService
{
  private dataKey;
  private dataPoints = {
    "dataPoints": [
      {
        percentage: 90,
        color: '#acded5',
        label: 'HTML'
      },
      {
        percentage: 95,
        color: '#d0ede7',
        label: 'CSS'
      },
      {
        percentage: 92,
        color: '#acded5',
        label: 'Javascript'
      },
      {
        percentage: 89,
        color: '#d0ede7',
        label: 'Animations'
      },
      {
        percentage: 80,
        color: '#acded5',
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
        label: 'Frameworks'
      },
      {
        percentage: 75,
        color: '#f49f8f',
        label: 'Automation'
      },
      {
        percentage: 75,
        color: '#f5795f',
        label: 'OS'
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
