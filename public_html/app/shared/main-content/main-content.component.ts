import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { MainContentService } from './main-content.service';
import { AspectsDirective } from './main-content.directive';
import { FullHeightDirective } from '../grow-sections/full-height.directive';
import { FullPageDirective } from '../grow-sections/full-page.directive';

@Component({
  selector: 'mainContent',
  templateUrl: 'app/shared/main-content/main-content.component.html',
  directives: [
    FullHeightDirective,
    FullPageDirective,
    AspectsDirective
  ],
  providers: [MainContentService]
})

export class MainContentComponent implements OnInit
{

  ngOnInit()
  {}

  constructor(private mainContentService: MainContentService)
  {}
}

