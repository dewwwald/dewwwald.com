import { Directive, ElementRef, Input, HostListener, OnInit } from '@angular/core';
import { WindowService } from '../services/window.service';

@Directive({
  selector: '[myFullHeight]',
})
export class FullHeightDirective implements OnInit {
  private el;
  private window;

  @HostListener('window:resize', ['$event'])
  private _resizeEventListiner() {
    this.el.style.height = this.window.innerHeight;
  }

  constructor (el: ElementRef, window: WindowService) {
    this.window = window.nativeWindow;
    this.el = el.nativeElement;
  }

  ngOnInit() {
    this.el.style.height = this.window.innerHeight;
  }
}
