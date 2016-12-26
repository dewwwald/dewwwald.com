import { Directive, ElementRef, Input, OnInit, HostListener } from '@angular/core';
import { WindowService } from '../services/window.service';

@Directive({
  selector: '[imageCover]',
  providers: [
    WindowService
  ]
})
export class ImageCoverDirective
{
  private el;
  private window;
  private orientation;
  private imageRatio;
  private container;
  private containerRatio;

  imageCover()
  {
    if (this.orientation == 'horizontal')
    {
    }
    else
    {
    }
  }

  @Input('zIndex') zIndex: number;

  @HostListener('window:resize', ['$event'])
  private _resizeEventListiner()
  {
    this.imageCover()
  }

  ngOnInit()
  {
    this.el.style.zIndex =  this.zIndex
    this.imageCover()
  }

  constructor (el: ElementRef, window: WindowService)
  {
    this.window = window.nativeWindow;
    this.el = el.nativeElement;
    this.container = this.el.parentElement;
    this.imageRatio = this.el.innerWidth / this.el.innerHeight;
    this.containerRatio = this.container.innerWidth / this.container.innerHeight;

    if (this.el.innerWidth >= this.el.innerHeight)
    {
      this.orientation = 'horizontal'
    }
    else
    {
      this.orientation = 'verticle'
    }
  }
}
