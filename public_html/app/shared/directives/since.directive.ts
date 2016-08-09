import { Directive, OnInit, ElementRef } from '@angular/core'
import { WindowService } from '../services/window.service'

@Directive({
  selector: '[since]',
  providers: [
    WindowService
  ]
})
export class SinceDirective
{
  private el;
  private since
  private current


  ngOnInit()
  {
    this.incrementSince()
  }

  incrementSince(monthCount = 0)
  {
    var _this = this
    var years =  0;
    if ((monthCount - monthCount%12) != 0)
    {
      years = (monthCount - monthCount%12)/12
    }
    var months = monthCount%12;

    this.setSince(years, months);

    if (
      years != (this.current.getYear() - this.since.getYear()) ||
      months != (this.current.getMonth() - this.since.getMonth())
    )
    {
      var tI = setTimeout(function () {
        _this.incrementSince.call(_this, monthCount + 1);
        clearTimeout(tI);
      }, 40);
    }
  }

  setSince(years: number, months: number)
  {
    var value = "";
    if (years > 0)
    {
      value += years + ' years'
    }
    if (years > 0 && months > 0)
    {
      value += ' and ' + months + ' months'
    }
    else
    {
      value += months + ' months'
    }
    this.el.innerHTML = value
  }

  constructor (el: ElementRef)
  {
    this.el = el.nativeElement;
    this.since = new Date('Sun Jan 31 2014 08:30:00 GMT+0200 (SAST)');
    this.current = new Date();
  }
}
