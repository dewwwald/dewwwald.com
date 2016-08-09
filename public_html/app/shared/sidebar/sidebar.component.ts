import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { PageScroll } from 'ng2-page-scroll';

import { SidebarService } from './sidebar.service';
import { FullHeightDirective } from '../directives/full-height.directive';
import { FullPageDirective } from '../directives/full-page.directive';
import { AppMenuDirective } from './middle-sidebar.directive';
import { SvgIconDirective } from '../directives/svg-icon-system.directive';



@Component({
  selector: 'sidebar',
  templateUrl: 'app/shared/sidebar/sidebar.component.html',
  directives: [
    FullHeightDirective,
    FullPageDirective,
    AppMenuDirective,
    ROUTER_DIRECTIVES,
    PageScroll,
    SvgIconDirective,
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

