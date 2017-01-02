import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { WindowService } from '../../shared/services/window.service';
import { UniqueNg2ChartComponent } from '../../shared/ng2-chart/ng2-chart.component';
import { WhyService } from './why.service';

@Component({
  selector: 'main',
  templateUrl: 'app/components/why/why.component.html',
  providers: [
    BrowserModule,
    FormsModule,
    WindowService,
    WhyService
  ],
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
