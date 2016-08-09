import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { MainContentComponent } from '../../shared/main-content/main-content.component';
import { FullHeightDirective } from '../../shared/directives/full-height.directive';
import { FullPageDirective } from '../../shared/directives/full-page.directive';
import { SinceDirective } from '../../shared/directives/since.directive';
import { BarChartDirective } from '../../shared/directives/chart.directive';
import { WindowService } from '../../shared/services/window.service';
import { WhyService } from './why.service';

@Component({
  selector: 'main',
  templateUrl: 'app/components/why/why.component.html',
  providers: [
    WindowService,
    WhyService
  ],
  directives: [
    ROUTER_DIRECTIVES,
    FullHeightDirective,
    FullPageDirective,
    SidebarComponent,
    SinceDirective,
    MainContentComponent,
    BarChartDirective
  ]
})
export class WhyComponent {
  public skills;

  ngOnInit  ()
  {
    this.setSkills();
  }

  setSkills ()
  {
    this.skills = this.whyService.getSkills()
  }
  constructor (private whyService: WhyService) {}
}
