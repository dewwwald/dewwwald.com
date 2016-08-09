import { Directive, OnInit, ElementRef, Input } from '@angular/core';

/**
 * #TODO
 * - Find a way to implement colors for both sass and js
 */

@Directive({
  selector: '[bgcModifier]'
})
export class BgcModifierDirective
{
  private colors;
  private el;
  private index;
  private opacity;

  @Input('bgcModifier') colorPar;

  ngOnInit ()
  {
    this.setColors()
    this.params()
    if(typeof this.opacity !== 'undefined')
    {
      this.el.style.backgroundColor = 'rgba(' + this.hexToRgb(this.colors[this.index % 3].hex) + ', ' + this.opacity + ')';
    }
    else
    {
      this.el.classNamr += ' ' + this.colors[this.index % 3].class;
    }
  }

  hexToRgb(hex)
  {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? parseInt(result[1], 16)+','+ parseInt(result[2], 16)+','+ parseInt(result[3], 16) : null;
  }

  params ()
  {
    let _this = this
    let params = this.colorPar.split(',');
    params.forEach(function (curr, i) {
      switch (i) {
        case 0:
          _this.index = curr.trim()
          break;
        case 1:
          _this.opacity = curr.trim()
          break;
      }
    });
  }

  setColors ()
  {
    // no service yet
    this.colors = [
      {class: 'bgc--secondary', hex: '#edd54f'},
      {class: 'bgc--primary', hex: '#acded5'},
      {class: 'bgc--tertiary', hex: '#f5795f'}
    ];
  }

  constructor (el: ElementRef)
  {
    this.el = el.nativeElement;
  }
}
