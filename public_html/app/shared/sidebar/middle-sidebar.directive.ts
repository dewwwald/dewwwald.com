import { Directive, ElementRef, Input, Renderer, AfterViewChecked } from '@angular/core';
import { WindowService } from '../../services/window.service';

@Directive({
  selector: '[myMiddleSidebar]',
  providers: [
    WindowService,
  ]
})
export class MiddleSidebarDirective implements AfterViewChecked
{
  private el;
  private window;
  private renderer;
  private viewChecked;

  ngAfterViewChecked ()
  {
    if (!this.viewChecked)
    {
      this.viewChecked = true;
      this.el.style.top = (this.window.scrollY + this.window.innerHeight/2 - this.el.offsetHeight/2) + "px";
    }
  }

  constructor (el: ElementRef, window: WindowService, renderer: Renderer)
  {
    this.renderer = renderer;
    this.window = window.nativeWindow;
    this.el = el.nativeElement;
    this.viewChecked = false;

    this.renderer.listenGlobal('window', 'scroll', (evt) => {
      /**
       * todo, clear call to listenGlobal
       * by calling the return function - unsubscribe
       */
      this.el.style.top = (this.window.scrollY + this.window.innerHeight/2 - this.el.offsetHeight/2) + "px";
    });
  }
}
