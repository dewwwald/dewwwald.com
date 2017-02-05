import { Injectable,  } from '@angular/core';
import { ScrollNavigationService } from './scroll-navigation.service';

@Injectable()
export class ScrollNavigationAnimationService {
  private targetOffsetTop;

  constructor(
    private scrollNavigationService: ScrollNavigationService
  ) {}

  animateToAvailibleHref() {
    if (typeof this.scrollNavigationService.href !== 'undefined') {
      let t = setTimeout(() => {
        this.determinTargetOffsetTop();
        if (this.targetOffsetTop > window.scrollY) {
          this.animateScrollToPos();
        }
        clearTimeout(t);
      }, 340);
    }
  }

  animateToUpdatedHref() {
    if (typeof this.scrollNavigationService.href !== 'undefined') {
      this.determinTargetOffsetTop();
      let t = setTimeout(() => {
        this.animateScrollToPos();
      }, 340);
    }
  }

  determinTargetOffsetTop() {
    let element = document.getElementById(this.scrollNavigationService.href);
    if (element) {
      this.targetOffsetTop = document.getElementById(this.scrollNavigationService.href).offsetTop;
    }
  }

  animateScrollToPos() {
    let currentScroll = { y: window.scrollY };
    TweenLite.to(currentScroll, .5, { y: this.targetOffsetTop, onUpdate: () => {
      window.scrollTo(0, currentScroll.y);
    } });
  }
}
