import { Injectable } from '@angular/core';

@Injectable()
export class WhatService
{
  getPortfolioItems()
  {
    var description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta maxime similique quia praesentium, blanditiis optio neque pariatur, laboriosam modi, ab doloremque a eaque earum. Dolorem quas hic autem ab. Reiciendis?';

    return [
      {
        img: {
          url: 'http://placekitten.com/500/500',
          alt: 'placekitten'
        },
        title: 'Lorem ipsum',
        description: description
      },
      {
        img: {
          url: 'http://placekitten.com/500/500',
          alt: 'placekitten'
        },
        title: 'Lorem ipsum',
        description: description
      },
      {
        img: {
          url: 'http://placekitten.com/500/500',
          alt: 'placekitten'
        },
        title: 'Lorem ipsum',
        description: description
      },
      {
        img: {
          url: 'http://placekitten.com/500/500',
          alt: 'placekitten'
        },
        title: 'Lorem ipsum',
        description: description
      },
      {
        img: {
          url: 'http://placekitten.com/500/500',
          alt: 'placekitten'
        },
        title: 'Lorem ipsum',
        description: description
      },
      {
        img: {
          url: 'http://placekitten.com/500/500',
          alt: 'placekitten'
        },
        title: 'Lorem ipsum',
        description: description
      },
    ];
  }
}
