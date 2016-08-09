import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { WindowService } from '../services/window.service';

@Directive({
  selector: '[myFullPage]',
  providers: [
    WindowService
  ]
})
export class FullPageDirective
{
  private el;
  private window;

  @HostListener('window:resize', ['$event'])
  private _resizeEventListiner()
  {
    this.setHeight()
  }

  setHeight()
  {
    this.el.style.height = 'auto';
    if (this.el.offsetHeight < this.window.innerHeight)
    {
      this.el.style.height = this.window.innerHeight;
    }
    else
    {
      this.el.style.minHeight = this.window.innerHeight;
    }
  }

  constructor (el: ElementRef, window: WindowService)
  {
    this.window = window.nativeWindow;
    this.el = el.nativeElement;
    this.setHeight();
  }
}
