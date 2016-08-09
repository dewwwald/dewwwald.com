import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { WindowService } from '../services/window.service';

@Directive({
  selector: '[halfPageHeight]',
  providers: [
    WindowService
  ]
})
export class HalfPageDirective
{
  private el;
  private window;

  @HostListener('window:resize', ['$event'])
  private _resizeEventListiner()
  {
    this.el.style.maxHeight = this.window.innerHeight/2;
  }

  constructor (el: ElementRef, window: WindowService)
  {
    this.window = window.nativeWindow;
    this.el = el.nativeElement;
    this.el.style.maxHeight = this.window.innerHeight/2;
  }
}
