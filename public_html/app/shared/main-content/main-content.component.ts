import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { MainContentService } from './main-content.service';
import { FullHeightDirective } from '../directives/full-height.directive';
import { FullPageDirective } from '../directives/full-page.directive';

@Component({
  selector: 'persona',
  templateUrl: 'app/shared/main-content/main-content.component.html',
  providers: [MainContentService]
})

export class MainContentComponent implements OnInit
{

  ngOnInit()
  {}

  constructor(private mainContentService: MainContentService)
  {}
}

