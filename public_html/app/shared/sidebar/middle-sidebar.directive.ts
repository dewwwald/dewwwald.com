import { Directive, ElementRef, AfterViewChecked, HostListener } from '@angular/core';
import { WindowService } from '../services/window.service';

@Directive({
  selector: '[appMenu]',
  providers: [
    WindowService,
  ]
})
export class AppMenuDirective implements AfterViewChecked
{
  private el;
  private window;
  private viewChecked;

  @HostListener('window:resize', ['$event'])
  private _resizeEventListiner()
  {
    if (this.window.innerWidth > 481)
    {
    }
  }

  ngAfterViewChecked ()
  {
    if (!this.viewChecked && this.window.innerWidth > 481)
    {
      this.viewChecked = true;
    }
  }

  constructor (el: ElementRef, window: WindowService)
  {
    this.window = window.nativeWindow;
    this.el = el.nativeElement;
    this.viewChecked = false;
  }
}
