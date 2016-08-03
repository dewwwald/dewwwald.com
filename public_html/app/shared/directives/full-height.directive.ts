import { Directive, ElementRef, Input } from '@angular/core';
import { WindowService } from '../services/window.service';

@Directive({
  selector: '[myFullHeight]',
  providers: [
    WindowService
  ]
})
export class FullHeightDirective
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
