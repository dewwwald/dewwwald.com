import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { SvgIconsSystemService } from '../services/svg-icon-system.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'svg-icon',
  template: ''
})
export class SvgIconComponent implements OnInit {
  public iconDef;
  private el;
  private svgSystem;
  private iconNameSubscriber$;

  @Input('iconName') iconName;
  @Input('iconNameObserver') iconNameObserver: Observable<any>;

  constructor (el: ElementRef, svgSystem: SvgIconsSystemService) {
    this.el = el.nativeElement;
    this.svgSystem = svgSystem;
  }

  svgWrapper(svgInner) {
    return `<svg viewBox="0 0 512 512">${svgInner}</svg>`;
  }

  renderIcon() {
    let innerHtml
    this.iconDef = this.svgSystem.getIcon(this.iconName)
    if (/</.test(this.iconDef)) {
      innerHtml = this.iconDef;
    } else {
      innerHtml = '<path fill="inherit" d="' + this.iconDef + '"></path>';
    }
    this.el.innerHTML = this.svgWrapper(innerHtml);
  }

  ngOnInit() {
    if (this.iconNameSubscriber$ === undefined && this.iconNameObserver !== undefined) {
      this.iconNameSubscriber$ = this.iconNameObserver
        .subscribe((evt) => this.renderIcon());
    }
    this.renderIcon();
  }
}
