import { Directive, OnInit, ElementRef, HostListener } from '@angular/core'
import { WindowService } from '../services/window.service'

@Directive({
  selector: '[slideHover]',
  providers: [
    WindowService
  ]
})
export class SlideHoverDirective
{
  private el;
  private window;
  private top;
  private right;
  private bottom;
  private left;
  private delay;

  @HostListener('mouseenter', ['$event'])
  onMouseEnter (event)
  {
    this.top = this.el.offsetTop - this.window.scrollY;
    this.right = this.el.offsetLeft + this.el.offsetWidth;
    this.bottom = this.el.offsetTop - this.window.scrollY + this.el.offsetHeight;
    this.left = this.el.offsetLeft;
    var leftDiff = event.clientX - this.left;
    var rightDiff = this.right - event.clientX;
    var topDiff = event.clientY - this.top;
    var bottomDiff = this.bottom - event.clientY;

    var closerToBottom = bottomDiff < leftDiff && bottomDiff < rightDiff && bottomDiff < topDiff;
    var closerToRight = rightDiff < leftDiff && rightDiff < bottomDiff && rightDiff < topDiff;
    var closerToLeft =  leftDiff < bottomDiff && leftDiff < rightDiff && leftDiff < topDiff;

    // Test the side of triangle and act accodingly
    if (closerToBottom)
    {
      this.el.className += ' portfolio-item-in-bottom';
    }
    else if (closerToRight)
    {
      this.el.className += ' portfolio-item-in-right';
    }
    else if (closerToLeft)
    {
      this.el.className += ' portfolio-item-in-left';
    }
    else // implied -> (closerToTop)
    {
      this.el.className += ' portfolio-item-in-top';
    }
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave (event)
  {
    var regexClass = new RegExp('portfolio-item-in-[a-z]*');
    this.el.className = 'portfolio-item-hold ' + this.el.className.replace(regexClass, '').trim();

    this.top = this.el.offsetTop - this.window.scrollY;
    this.right = this.el.offsetLeft + this.el.offsetWidth;
    this.bottom = this.el.offsetTop - this.window.scrollY + this.el.offsetHeight;
    this.left = this.el.offsetLeft;

    var leftDiff = this.left - event.clientX;
    var rightDiff = event.clientX - this.right;
    var topDiff = this.top - event.clientY;
    var bottomDiff = event.clientY - this.bottom;

    var closerToBottom = bottomDiff < leftDiff && bottomDiff < rightDiff && bottomDiff < topDiff;
    var closerToRight = rightDiff < leftDiff && rightDiff < bottomDiff && rightDiff < topDiff;
    var closerToLeft =  leftDiff < bottomDiff && leftDiff < rightDiff && leftDiff < topDiff;

    // Test the side of triangle and act accodingly
    if (closerToBottom)
    {
      this.el.className = this.el.className.replace('portfolio-item-hold', '') + ' portfolio-item-out-bottom';
    }
    else if (closerToRight)
    {
      this.el.className = this.el.className.replace('portfolio-item-hold', '') + ' portfolio-item-out-right';
    }
    else if (closerToLeft)
    {
      this.el.className = this.el.className.replace('portfolio-item-hold', '') + ' portfolio-item-out-left';
    }
    else // implied -> (closerToTop)
    {
      this.el.className = this.el.className.replace('portfolio-item-hold', '') + ' portfolio-item-out-top';
    }
    var regexOutClass = new RegExp('portfolio-item-out-[a-z]*');
    var _this = this;
    setTimeout(function () {
      _this.el.className = _this.el.className.replace(regexOutClass, '').trim();
    }, this.delay)
  }


  constructor (el: ElementRef, window: WindowService)
  {
    this.window = window.nativeWindow
    this.el = el.nativeElement
    this.delay = 250;
  }
}
