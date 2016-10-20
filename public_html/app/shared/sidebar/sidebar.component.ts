import { Component, OnInit } from '@angular/core';
import { PageScroll } from 'ng2-page-scroll';

import { SidebarService } from './sidebar.service';

@Component({
  selector: 'sidebar',
  templateUrl: 'app/shared/sidebar/sidebar.component.html',
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

