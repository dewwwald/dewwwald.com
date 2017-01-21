import { Directive, ElementRef, Input, HostListener, OnInit } from '@angular/core';
import { WindowService } from '../services/window.service';

@Directive({
  selector: '[myFullPage]'
})
export class FullPageDirective implements OnInit {
  private el;
  private window;

  @HostListener('window:resize', ['$event'])
  private _resizeEventListiner()
  {
    this.setHeight()
  }

  setHeight() {
    this.el.style.height = 'auto';
    if (this.el.offsetHeight < this.window.innerHeight) {
      this.el.style.height = this.window.innerHeight+'px';
    } else {
      this.el.style.minHeight = this.window.innerHeight+'px';
    }
  }

  constructor (el: ElementRef, window: WindowService) {
    this.window = window.nativeWindow;
    this.el = el.nativeElement;
  }

  ngOnInit() {
    this.setHeight();
  }
}
