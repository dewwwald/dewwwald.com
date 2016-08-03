import { Directive, ElementRef, Input } from '@angular/core';
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

  constructor (el: ElementRef, window: WindowService)
  {
    this.window = window.nativeWindow;
    this.el = el.nativeElement;
    this.el.style.height = this.window.innerHeight;
  }
}
