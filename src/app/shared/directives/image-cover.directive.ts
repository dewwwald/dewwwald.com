import { Directive, ElementRef, Input, OnInit, HostListener } from '@angular/core';
import { WindowService } from '../services/window.service';
import { Observable } from 'rxjs/Rx';

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
  private observeLoaded$;
  private loadSubscriber$;

  styleReset() {
    this.el.style.height = 'auto';
    this.el.style.width = 'auto';
    this.el.style.left = 'auto';
    this.el.style.top = 'auto';
    this.el.style.transform = 'none';
  }

  detectOrientation() {
    this.styleReset();
    if (this.el.clientWidth >= this.el.clientHeight)
    {
      this.orientation = 'horizontal'
    } else {
      this.orientation = 'verticle'
    }
  }

  imageCover() {
    this.detectOrientation();
    if (this.orientation == 'horizontal' && this.widerThanParent()) {
      this.el.style.height = '100%';
      this.el.style.width = 'auto';
      this.el.style.left = '50%';
      this.el.style.transform = 'translateX(-50%)';
    } else if (this.higherThanParent()) {
      this.el.style.height = 'auto';
      this.el.style.width = '100%';
      this.el.style.top = '50%';
      this.el.style.transform = 'translateY(-50%)';
    } else {

    }
  }

  @Input('zIndex') zIndex: number;

  @HostListener('load', ['evt'])
  private _imageLoadComplete()
  {
    this.imageCover()
  }

  @HostListener('window:resize', ['$event'])
  private _resizeEventListiner()
  {
    this.imageCover()
  }

  widerThanParent() {
    return this.el.clientWidth > this.el.parentNode.clientWidth;
  }

  higherThanParent() {
    return this.el.clientHeight > this.el.parentNode.clientHeight;
  }

  observeImageLoadComplete() {
    this.observeLoaded$ = Observable.fromEvent(this.el, 'load');
    this.loadSubscriber$ = this.observeLoaded$.subscribe(evt => {
      this.imageCover();
      this.loadSubscriber$.unsubscribe();
    });
  }

  ngOnInit() {
    this.el.style.zIndex =  this.zIndex;
    this.imageCover();
  }

  constructor (el: ElementRef, window: WindowService)
  {
    this.window = window.nativeWindow;
    this.el = el.nativeElement;
    this.container = this.el.parentElement;
    this.imageRatio = this.el.innerWidth / this.el.innerHeight;
    this.containerRatio = this.container.innerWidth / this.container.innerHeight;
    this.observeImageLoadComplete();
  }
}
