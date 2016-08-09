import { Directive, Input, OnInit, ElementRef } from '@angular/core';
import { SvgIconsSystemService } from '../services/svg-icon-system.service';

@Directive({
  selector: '[iconDirr]',
  providers: [
    SvgIconsSystemService,
  ]
})
export class SvgIconDirective {
  public iconDef;
  private el;
  private svgSystem;

  @Input('icon') icon;
  @Input('cssClass') cssClass;

  ngOnInit()
  {
    console.log(this.icon);
    this.iconDef = this.svgSystem.getIcon('github')
    this.el.innerHTML = '<g><path d="' + this.iconDef + '"></path></g>'
  }

  constructor (el: ElementRef, svgSystem: SvgIconsSystemService) {
    this.el = el.nativeElement;
    this.svgSystem = svgSystem;
  }
}
