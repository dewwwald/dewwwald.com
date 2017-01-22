import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[svgChartAnimateBar]',
  host: {'(window:scroll)': 'checkAnimation($event)'},
})
export class SvgChartAnimateBarDirective implements OnInit {
  @Input('finalHeight') finalHeight;
  @Input('offsetY') offsetY;
  @Input('startHeight') startHeight;
  @Input('startOffsetY') startOffsetY;
  @Input('color') color: 'rgb(255, 255, 255)';
  private element;
  private tween;
  private windowTotalHeight;

  @Input('window:scroll') private onScroll($event) {
  }

  constructor(element: ElementRef) {
    let body = document.body,
    html = document.documentElement;
    this.element = element.nativeElement;
    this.windowTotalHeight = Math.max( body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight );
  }
  _startAnimation() {
    this.tween.play();
  }

  _pauseAnimation() {
    this.tween.pause();
  }

  checkAnimation($event) {
    if ((this.element.parentNode.getBoundingClientRect().top - window.innerHeight * .3333) < 0) {
      this._startAnimation();
    } else if ((window.innerHeight + window.scrollY) > this.windowTotalHeight - 250) {
      this._startAnimation();
    }
  }

  ngOnInit() {
    this.tween = TweenLite.set(this.element, {
      height: this.startHeight,
      y: this.startOffsetY,
      fill: this.color
    });
    this.tween = TweenLite.to(this.element, .5, {
      height: this.finalHeight,
      y: this.offsetY,
    });
    this._pauseAnimation();
  }
}

