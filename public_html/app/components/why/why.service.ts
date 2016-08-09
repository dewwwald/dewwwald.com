import { Injectable } from '@angular/core'

@Injectable()
export class WhyService
{
  getSkills ()
  {
    return [
      {name: 'Angular'},
      {name: 'SCSS'},
      {name: 'Javascript'},
      {name: 'Front End'},
      {name: ''},
      {name: ''},
      {name: ''},
      {name: ''},
      {name: ''},
    ];
  }

  constructor () {}
}
