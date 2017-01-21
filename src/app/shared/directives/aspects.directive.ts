import { Directive, ElementRef, Input, AfterViewChecked } from '@angular/core';
import { WindowService } from '../services/window.service';
import { AspectsService } from '../services/aspects.service';

@Directive({
  selector: '[aspects]',
})
export class AspectsDirective implements AfterViewChecked
{
  private el;
  private text;
  private checked;
  private aspectsService;
  private html;
  private nextAspect;
  private currentHtml;
  private keystrokes;

  stepOutText (attribute, current, i = undefined)
  {
    if (typeof i == 'undefined') i = attribute.value.length;
    var _this = this;
    if (i >= 0)
    {
      var timer = setTimeout(function ()
      {
        var newText = attribute.value.substring(0, i);
        _this.el.childNodes[current].data = newText;
        _this.stepOutText(attribute, current, i-1);
        clearTimeout(timer);
      }, this.keystrokes);
    }
    else
    {
      return this.hideText(current - 1);
    }
  }

  stepInText (attribute, current, i = undefined)
  {
    if (typeof i == 'undefined') i = 0;
    var _this = this;
    if (i <= attribute.value.length)
    {
      var timer = setTimeout(function ()
      {
        var newText = attribute.value.substring(0, i);
        _this.el.childNodes[current].data = newText;
        _this.stepInText(attribute, current, i+1);
        clearTimeout(timer);
      }, this.keystrokes);
    }
    else
    {
      return this.showText(current - 1);
    }
  }

  stepOutParseText (attribute, current, parseIndex, attrIndex = undefined)
  {
    if (typeof attrIndex == 'undefined') attrIndex = attribute.value.length;
    var _this = this;
    if (attrIndex >= 0)
    {
      var timer = setTimeout(function ()
      {
        var newText = attribute.value.substring(0, attrIndex);
        _this.el.childNodes[current].childNodes[parseIndex].data = newText;
        _this.stepOutParseText(attribute, current, parseIndex, attrIndex-1);
        clearTimeout(timer);
      }, this.keystrokes);
    }
    else
    {
      return this.htmlElement(attribute, current, parseIndex - 1);
    }
  }

  htmlElement (attribute, current, parseIndex = undefined)
  {
    if (typeof parseIndex == 'undefined') parseIndex = attribute.parse.length - 1;
    var _this = this;
    if (parseIndex >= 0)
    {
      this.stepOutParseText(attribute.parse[parseIndex], current, parseIndex);
    }
    else
    {
      return this.hideText(current - 1);
    }
  }

  showText (i = undefined)
  {
    if (typeof i == 'undefined') i = this.nextAspect.length - 1;

    if (i >= 0)
    {
      this.stepInText(this.nextAspect[i], i);
    }
    else
    {
      this.loop(3000, 'textOutIn');
    }
  }

  hideText (i = undefined)
  {
    if (typeof i == 'undefined') i = this.currentHtml.length - 1;

    if (i >= 0)
    {
      if (this.currentHtml[i].type == 'text')
      {
        this.stepOutText(this.currentHtml[i], i);
      }
      else
      {
        this.htmlElement(this.currentHtml[i], i)
      }
    }
    else
    {
      this.showText();
    }
  }

  textOutIn ()
  {
    this.nextAspect = this.aspectsService.nextAspect();
    this.currentHtml = this.aspectsService.parseHtmlText(this.el.childNodes);
    this.el.className = this.el.className + ' typing';
    this.hideText();
  }

  loop (delay, localCb)
  {
    var _this = this;
    var timeout = setTimeout(
      function () {
        clearTimeout(timeout);
        return _this[localCb].call(_this);
      },
    delay);
    return;
  }

  ngAfterViewChecked ()
  {
    this.html = this.el.innerHTML;

    if (!this.checked)
    { //call this only once
      this.checked = !this.checked;
      this.loop(3000, 'textOutIn');
    }
  }

  constructor (el: ElementRef, aspectsService: AspectsService)
  {
    this.checked = false;
    this.aspectsService = aspectsService;
    this.el = el.nativeElement;
    this.keystrokes = 75;
  }
}
