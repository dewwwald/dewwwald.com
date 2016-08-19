import { Directive, ElementRef, Input, OnInit } from '@angular/core';
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

  @Input('iconName') iconName;

  constructor (el: ElementRef, svgSystem: SvgIconsSystemService) {
    this.el = el.nativeElement;
    this.svgSystem = svgSystem;
  }

  icons()
  {
    console.log(this.iconName);
    this.iconDef = this.svgSystem.getIcon('github')
    this.el.innerHTML = '<g><path d="' + this.iconDef + '"></path></g>'
  }
  ngOnInit()
  {
  }

}
