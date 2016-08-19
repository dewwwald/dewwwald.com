import {Injectable} from '@angular/core'

@Injectable()
export class GraphService
{
  private bars;

  constructor()
  {
    this.bars = [
      {
        label: 'label',
        height: 80
      },
      {
        label: 'label 2',
        height: 50
      },
      {
        label: 'label 3',
        height: 60
      }
    ];
  }

  getBar()
  {
    return this.bars;
  }
}
