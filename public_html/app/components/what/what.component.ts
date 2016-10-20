import { Component, OnInit } from '@angular/core';

import { WindowService } from '../../shared/services/window.service';
import { WhatService } from './what.service';

@Component({
  selector: 'main',
  templateUrl: 'app/components/what/what.component.html',
  providers: [
    WindowService,
    WhatService
  ]
})
export class WhatComponent implements OnInit
{
  public portfolio;

  ngOnInit()
  {
    this.setPortfolio();
  }

  setPortfolio ()
  {
    this.portfolio = this.whatService.getPortfolioItems();
    console.log(this.portfolio);
  }

  constructor (private whatService: WhatService) {}
}
