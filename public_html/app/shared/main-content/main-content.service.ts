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
      [{value: 'Who am I?', type: 'text'}],
      [{value: 'Why pick me?', type: 'text'}],
      [{value: 'What I have done?', type: 'text'}],
      [{value: 'Where can you find me?', type: 'text'}],
      [{value: 'When can you have my experties?', type: 'text'}]
    ];
  }
}
