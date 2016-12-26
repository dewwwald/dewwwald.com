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
          url: 'http://dewwwald.com/assets/img/HS-shopfitter.jpg',
          alt: 'dewwwald web development - hs-shopfitters website screenshot'
        },
        title: 'H.S. Shopfitters',
        description: "A website built on ProcessWire, uses the scroll animation library called Skrollr to implement a curtain."
      },
      {
        img: {
          url: 'http://dewwwald.com/assets/img/cafe-cazengo.jpg',
          alt: 'dewwwald web development - Cafe Cazengo website screenshot'
        },
        title: 'Cafe Cazengo',
        description: description
      },
      {
        img: {
          url: 'http://dewwwald.com/assets/img/the-alter-native.jpg',
          alt: 'dewwwald web development - The alter native website screenshot'
        },
        title: 'The Alter Native',
        description: description
      },
      {
        img: {
          url: 'http://dewwwald.com/assets/img/dare-to-explore.jpg',
          alt: 'dewwwald web development - Dare to explore website screenshot'
        },
        title: 'Dare To Explore',
        description: description
      },
      {
        img: {
          url: 'http://dewwwald.com/assets/img/monarchandco.jpg',
          alt: 'dewwwald web development - Monarch and co website screenshot'
        },
        title: 'Monarch & Co',
        description: description
      },
      {
        img: {
          url: 'http://dewwwald.com/assets/img/click-to-drive.jpg',
          alt: 'dewwwald web development - Click to drive website screenshot'
        },
        title: 'Click To Drive',
        description: description
      },
    ];
  }
}
