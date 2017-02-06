import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { ScrollNavigationService } from './scroll-navigation.service';
import { ScrollNavigationAnimationService } from './scroll-navigation-animation.service';

@Directive({
  selector: '[scrollNavigation]',
})
export class ScrollNavigationDirective implements OnInit {
  private elm;
  private targetElement;
  private targetElementTopOffset;
  private targetElementEndOffset;
  private avoidRegetOfElements: string = 'check';

  @Input('dataHash') dataHash;
  @Input('dataLink') dataLink;

  constructor(
    private scrollNavigationService: ScrollNavigationService,
    private scrollNavigationAnimationService: ScrollNavigationAnimationService,
    private router: Router,
    elm: ElementRef
  ) {
    this.elm = elm.nativeElement;
    this.elm.addEventListener('click', (evt) => {
      this.scrollNavigationService.href = this.dataHash;
      this.navigateOnSamePage();
    });
    window.addEventListener('scroll', () => {
      this.getTargetElementOnce();
      this.applyNavigationClass();
    });
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && this.dataLink !== val.url) {
        this.elm.parentNode.className = this.elm.parentNode.className.replace(' scroll-nav-item--current', '');
      } else {
        this.getTargetElementOnce();
        this.applyNavigationClass();
        this.scrollNavigationAnimationService.animateToUpdatedHref();
      }
    });
  }

  ngOnInit() {
    this.elm.parentNode.className =
      this.elm.parentNode.className
        .replace(' scroll-nav-item--current', '')
        .replace(' scroll-nav-item', '');
    this.elm.parentNode.className += ' scroll-nav-item';
  }

  getTargetElementOnce() {
    if (this.avoidRegetOfElements === 'check') {
      this.targetElement = document.getElementById(this.dataHash);
      this.avoidRegetOfElements = 'wait';
    } else if (this.avoidRegetOfElements === 'wait') {
      let t = setTimeout(() => {
        this.avoidRegetOfElements = 'check';
        clearTimeout(t);
      }, 500);
      this.avoidRegetOfElements = 'nothing';
    }
  }

  applyNavigationClass() {
    if (!!this.targetElement) {
      this.targetElementTopOffset = this.targetElement.offsetTop - 100;
      this.targetElementEndOffset = this.targetElement.offsetTop + this.targetElement.clientHeight - 100;
    }
    this.setupScrollNavigate();
  }

  navigateOnSamePage() {
    this.scrollNavigationAnimationService.animateToUpdatedHref();
  }

  setActiveClass() {
    if (this.elm.parentNode.className.indexOf('scroll-nav-item--current') === -1) {
      this.elm.parentNode.className += ' scroll-nav-item--current';
    }
  }

  isCurrentHref() {
    if (!this.targetElement) {
      return false;
    }
    return window.scrollY >= this.targetElementTopOffset && window.scrollY < this.targetElementEndOffset;
  }

  setupScrollNavigate() {
    if (
      window.location.pathname === this.dataLink &&
      this.isCurrentHref()
    ) {
      this.scrollNavigationService.setupFirstOccurance(this.dataHash);
      this.setActiveClass();
    } else {
      this.elm.parentNode.className = this.elm.parentNode.className.replace(' scroll-nav-item--current', '');
    }
  }
}
