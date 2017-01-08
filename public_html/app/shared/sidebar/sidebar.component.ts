import { Component, OnInit, ElementRef, Renderer } from '@angular/core';
import { PageScroll } from 'ng2-page-scroll';

import { SidebarService } from './sidebar.service';

@Component({
  selector: 'sidebar',
  templateUrl: 'app/shared/sidebar/sidebar.component.html',
  providers: [SidebarService]
})

export class SidebarComponent implements OnInit {
  private sidebarService
  private navItems;
  private logoUrl;
  private navInOut:string;
  private element;
  private renderer;

  ngOnInit()
  {
    this.navItems = this.sidebarService.getNavItems();
    this.logoUrl = this.sidebarService.getLogoUrl();
    this.listenForExit();
  }

  toggleNavigationIn()
  {
    if (this.element.className.indexOf('sidebar--in') == -1) {
      this.element.className = this.element.className + ' sidebar--in';
    }
  }

  toggleNavigationOut()
  {
    this.element.className = this.element.className.replace('sidebar--in', '').trim();
  }

  listenForExit() {
    this.renderer.listen(this.element, 'mouseleave', () =>
      this.toggleNavigationOut()
    )
  }


  constructor(sidebarService:SidebarService, element:ElementRef, renderer: Renderer)
  {
    this.element = element.nativeElement;
    this.renderer = renderer;
    this.sidebarService = sidebarService;
  }
}

