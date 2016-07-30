import { Directive, ElementRef, Input, AfterViewChecked } from '@angular/core';
import { WindowService } from '../../services/window.service';
import { MainContentService } from './main-content.service';

@Directive({
  selector: '[aspects]',
  providers: [
    WindowService,
    MainContentService
  ]
})
export class AspectsDirective implements AfterViewChecked
{
  private el;
  private window;
  private text;
  private checked;
  private mainContentService;
  private html;
  private nextAspect;
  private currentHtml;

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
      }, 175);
    }
    else
    {
      return this.hideText(current - 1);
    }
  }

  htmlElement (attribute, current, i = undefined)
  {
    if (typeof i == 'undefined') i = attribute.parse.length;
    var _this = this;
    if (i >= 0)
    {
      this.stepOutText(this.currentHtml[i], i);
      var timer = setTimeout(function ()
      {
        var newText = attribute.value.substring(0, i);
        _this.el.childNodes[current].data = newText;
        _this.stepOutText(attribute, current, 'localCb');
        clearTimeout(timer);
      }, 175);
    }
    else
    {
      return this.hideText(current - 1);
    }
  }

  hideText (i = undefined)
  {
    if (typeof i == 'undefined') i = this.currentHtml.length - 1;

    if (i >= 0)
    {
      console.log(this.currentHtml[i].type == 'text');
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
      // call step in then in step in call ->
      // this.loop(4250*0, 'textOutIn');
    }
  }

  textOutIn ()
  {
    this.nextAspect = this.mainContentService.nextAspect();
    this.currentHtml = this.mainContentService.parseHtmlText(this.el.childNodes);
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
      this.loop(4250*0, 'textOutIn');
    }
  }

  constructor (el: ElementRef, window: WindowService, mainContentService: MainContentService)
  {
    this.checked = false;
    this.window = window.nativeWindow;
    this.mainContentService = mainContentService;
    this.el = el.nativeElement;
  }
}
