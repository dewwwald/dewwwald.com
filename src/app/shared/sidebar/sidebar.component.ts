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
  private barOne;
  private barTwo;
  private barThree;
  private navToggled: boolean;
  private togglerElement;

  public navToggler$;

  @ViewChild("togglerable") togglerable: ElementRef;

  ngOnInit() {
    this.navToggled = false;
    this.navItems = this.sidebarService.getNavItems();
    this.logoUrl = this.sidebarService.getLogoUrl();
    this.listenForExit();
    this.togglerElement = this.togglerable.nativeElement;
    this.navToggler$ = Observable.fromEvent(this.togglerElement, 'click');
    this.navToggler$.map(evt => { return evt; });
  }

  setupElements() {
    this.barOne = document.getElementById('burger-bar-one');
    this.barTwo = document.getElementById('burger-bar-two');
    this.barThree = document.getElementById('burger-bar-three');
  }

  toggleNav() {
    if (!this.navToggled) {
      this.toggleNavigationIn();
    } else {
      this.toggleNavigationOut();
    }
  }

  toggleNavigationIn() {
    this.setupElements();
    this.navToggled = true;
    TweenLite.to(this.barOne, .5, { strokeDashoffset: -1042 } );
    TweenLite.to(this.barTwo, .5, { strokeDashoffset: -1216 } );
    TweenLite.to(this.barThree, .5, { opacity: 0, x: -1000 });
    if (this.element.className.indexOf('sidebar--in') === -1) {
      this.element.className += ' sidebar--in';
    }
  }

  toggleNavigationOut() {
    this.setupElements();
    this.navToggled = false;
    TweenLite.to(this.barOne, .5, { strokeDashoffset: 0} );
    TweenLite.to(this.barTwo, .5, { strokeDashoffset: 0} );
    TweenLite.to(this.barThree, .5, { opacity: 1, x: 0 });
    this.element.className = this.element.className.replace(' sidebar--in', '');
  }

  listenForExit() {
    this.renderer.listen(this.element, 'mouseleave', () =>
      this.toggleNavigationOut()
    );
  }

  navigationClick() {
    let delay = setTimeout(() => {
      this.toggleNavigationOut();
      clearTimeout(delay);
    }, 250);
  }

  constructor(sidebarService: SidebarService, element: ElementRef, renderer: Renderer) {
    this.element = element.nativeElement;
    this.renderer = renderer;
    this.sidebarService = sidebarService;
  }
}

