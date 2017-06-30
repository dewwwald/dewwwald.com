import { Component, OnInit } from '@angular/core';
import { WhatService } from './what.service';

@Component({
  selector: 'main',
  templateUrl: './what.component.html',
})
export class WhatComponent implements OnInit {
  public portfolio;

  ngOnInit() {
    this.setPortfolio();
  }

  setPortfolio () {
    this.portfolio = this.whatService.getPortfolioItems();
  }

  constructor (private whatService: WhatService) {
    ga('set', 'page', '/what');
    ga('send', 'pageview');
  }
}
