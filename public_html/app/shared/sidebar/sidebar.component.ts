import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { SidebarService } from './sidebar.service';
import { FullHeightDirective } from '../directives/full-height.directive';
import { FullPageDirective } from '../directives/full-page.directive';
import { MiddleSidebarDirective } from './middle-sidebar.directive';

@Component({
  selector: 'sidebar',
  templateUrl: 'app/shared/sidebar/sidebar.component.html',
  directives: [
    FullHeightDirective,
    FullPageDirective,
    MiddleSidebarDirective,
    ROUTER_DIRECTIVES
  ],
  providers: [SidebarService]
})

export class SidebarComponent implements OnInit {
  navItems;
  logoUrl;

  ngOnInit()
  {
    this.getNavItems();
    this.getLogoUrl();
  }

  getLogoUrl ()
  {
    this.logoUrl = this.sidebarService.getLogoUrl();
  }
  getNavItems ()
  {
    this.navItems = this.sidebarService.getNavItems();
  }

  constructor(private sidebarService: SidebarService)
  {}
}

