import { Component, OnInit, ElementRef, ViewChild, Renderer  } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  private sidebarService
  private navItems;
  private logoUrl;
  private navInOut: string;
  private element;
  private renderer;

  private navToggled: boolean;
  private navTogglerIcon: string;
  private togglerElement;

  public navToggler$;

  @ViewChild("togglerable") togglerable: ElementRef;

  ngOnInit() {
    this.navToggled = false;
    this.navTogglerIcon = "burger";
    this.navItems = this.sidebarService.getNavItems();
    this.logoUrl = this.sidebarService.getLogoUrl();
    this.listenForExit();
    this.togglerElement = this.togglerable.nativeElement;
    this.navToggler$ = Observable.fromEvent(this.togglerElement, 'click');
    this.navToggler$.map(evt => { return evt; });
  }

  toggleNav() {
    this.navToggled ? this.toggleNavigationOut() : this.toggleNavigationIn();
  }

  toggleNavigationIn() {
    this.navToggled = true;
    this.navTogglerIcon = "close";
    if (this.element.className.indexOf('sidebar--in') == -1) {
      this.element.className = this.element.className + ' sidebar--in';
    }
  }

  toggleNavigationOut() {
    this.navToggled = false;
    this.navTogglerIcon = "burger";
    this.element.className = this.element.className.replace('sidebar--in', '').trim();
  }

  listenForExit() {
    this.renderer.listen(this.element, 'mouseleave', () =>
      this.toggleNavigationOut()
    );
  }


  constructor(sidebarService: SidebarService, element: ElementRef, renderer: Renderer) {
    this.element = element.nativeElement;
    this.renderer = renderer;
    this.sidebarService = sidebarService;
  }
}

