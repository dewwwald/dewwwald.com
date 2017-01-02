import { Injectable } from "@angular/core"

@Injectable()
export class Ng2ChartService
{
  private dataKey;
  private labels = {
    "frontEnd": ['HTML', 'CSS', 'Javascript', 'Angular', 'UI/UX'],
    "backEnd": ['Node.js', 'PHP', 'Web frameworks', 'Automation', 'Web Server']
  }
  private dataPoints = {
    "frontEnd": [
      {
        data: [90, 95, 85, 75, 80, 0],
        backgroundColor: [
          'rgba(255, 255, 255, .7)',
          'rgba(255, 255, 255, .7)',
          'rgba(255, 255, 255, .7)',
          'rgba(255, 255, 255, .7)',
          'rgba(255, 255, 255, .7)',
          'rgba(255, 255, 255, .7)'
        ],
      },
    ],
    "backEnd": [
      {
        data: [90, 95, 85, 75, 75, 0],
        backgroundColor: [
          'rgba(255, 255, 255, .7)',
          'rgba(255, 255, 255, .7)',
          'rgba(255, 255, 255, .7)',
          'rgba(255, 255, 255, .7)',
          'rgba(255, 255, 255, .7)',
          'rgba(255, 255, 255, .7)'
        ],
      },
    ]
  }


  public getLabels ()
  {
    return this.labels[this.dataKey];
  }

  public getData ()
  {
    return this.dataPoints[this.dataKey];
  }

  public retrieveData (dataKey)
  {
    this.dataKey = dataKey;
  }
}
