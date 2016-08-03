import { Injectable, ElementRef } from '@angular/core';

@Injectable()
export class MainContentService
{
  private index;

  constructor ()
  {
    this.index = 0;
  }

  parseHtmlText (children)
  {
    var count = 0;
    var obj = [];
    do
    {
      var type = children[count]
        .toString()
        .toLowerCase()
        .replace(/\[object (html)?(.*)\]/, "$2")
        .replace("element", "");

      if (type == 'text' && children[count].data.trim() != '')
      {
        obj[count] = {
          type: type,
          value: children[count].data.trim()
        };
      }
      else if (type != 'text')
      {
        obj[count] = {
          type: 'htmlElement',
          element: children[count],
          parse: this.parseHtmlText(children[count].childNodes)
        };
      }
      count++;
    }
    while (count < children.length);
    return obj;
  }



  nextAspect ()
  {
    if (this.index > 4) {
      this.index = 0;
    }
    var aspect = this.getAspects()[this.index];
    this.index++;
    return aspect;
  }

  getAspects()
  {
    return [
      [{value: 'Nice to meet you!', type: 'text'}],
      [{value: 'Lorem ipsum dolor sit amet', type: 'text'}],
      [{value: 'Lorem ipsum dolor sit amet', type: 'text'}],
      [{value: 'Lorem ipsum dolor sit amet', type: 'text'}],
      [{value: 'Lorem ipsum dolor sit amet', type: 'text'}]
    ];
  }
}
