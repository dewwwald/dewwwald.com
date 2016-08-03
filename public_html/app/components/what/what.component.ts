import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { MainContentComponent } from '../../shared/main-content/main-content.component';
import { FullHeightDirective } from '../../shared/directives/full-height.directive';
import { FullPageDirective } from '../../shared/directives/full-page.directive';

import { WindowService } from '../../shared/services/window.service';
import { WhatService } from './what.service';

@Component({
  selector: 'main',
  templateUrl: 'app/components/what/what.component.html',
  providers: [
    WindowService,
    WhatService
  ],
  directives: [
    ROUTER_DIRECTIVES,
    FullHeightDirective,
    FullPageDirective,
    SidebarComponent,
    MainContentComponent
  ]
})
export class WhatComponent
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
