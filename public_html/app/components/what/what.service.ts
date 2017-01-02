import { Injectable } from '@angular/core';

@Injectable()
export class WhatService
{
  getPortfolioItems()
  {
    return [
      {
        img: {
          url: 'http://dewwwald.com/assets/img/HS-shopfitter.jpg',
          alt: 'dewwwald web development - hs-shopfitters website screenshot'
        },
        title: 'H.S. Shopfitters',
        description: "A website built on ProcessWire, uses the scroll animation library called Skrollr to implement a curtain. Designed by Fixate designers and done in my time at the company.",
        link: "http://hsshopfitters.co.za/"
      },
      {
        img: {
          url: 'http://dewwwald.com/assets/img/cafe-cazengo.jpg',
          alt: 'dewwwald web development - Cafe Cazengo website screenshot'
        },
        title: 'Cafe Cazengo',
        description: "A website built on ProcessWire, was my first introduction to svg and how to modify them with css I also had to do multilingual support. Designed by Fixate designers and done in my time at the company.",
        link: "http://cafecazengo.com/"
      },
      {
        img: {
          url: 'http://dewwwald.com/assets/img/the-alter-native.jpg',
          alt: 'dewwwald web development - The alter native website screenshot'
        },
        title: 'The Alter Native',
        description: "The first website that I built, uses ProcessWire as a CMS. Mostly under the guidance of a Fixate senoir. Designed by Fixate designers and done in my time at the company.",
        link: "http://zanelemodiba.com/"
      },
      {
        img: {
          url: 'http://dewwwald.com/assets/img/dare-to-explore.jpg',
          alt: 'dewwwald web development - Dare to explore website screenshot'
        },
        title: 'Dare To Explore',
        description: "A website built on ProcessWire. One of the favourites I worked on. Was the first web forms I worked on that stretched me. Designed by Fixate designers and done in my time at the company.",
        link: "http://daretoexplore.co.za/"
      },
      {
        img: {
          url: 'http://dewwwald.com/assets/img/monarchandco.jpg',
          alt: 'dewwwald web development - Monarch and co website screenshot'
        },
        title: 'Monarch & Co',
        description: "A project built on ProcessWire. I had to migrate allot of data from Wordpress and create a multi site, however that feature was never deployed. Designed by Fixate designers and done in my time at the company.",
        link: "http://monarchandco.com/"
      },
      {
        img: {
          url: 'http://dewwwald.com/assets/img/click-to-drive.jpg',
          alt: 'dewwwald web development - Click to drive website screenshot'
        },
        title: 'Click To Drive',
        description: "The first website where I had to work in a team doing end to end front end development alongside a backend that had more experience than I. Designed by Cubezoo designers and done in my time at the company.",
        link: "http://clicktodrive.co.za/"
      },
    ];
  }
}
