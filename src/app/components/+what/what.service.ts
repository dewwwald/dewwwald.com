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
        description: "Website built with ProcessWire and uses the scroll animation library called Skrollr to implement a curtain. <br/><br/><small><em>Designed by Fixate and coding done while employed there.</em></small>",
        link: "http://hsshopfitters.co.za/"
      },
      {
        img: {
          url: 'http://dewwwald.com/assets/img/cafe-cazengo.jpg',
          alt: 'dewwwald web development - Cafe Cazengo website screenshot'
        },
        title: 'Cafe Cazengo',
        description: "Website built with ProcessWire. This project introduced me to working with svgs and modifying them with css. For this project I also had to do multilingual support. <br/><br/><small><em>Designed by Fixate and coding done while employed there.</em></small>",
        link: "http://cafecazengo.com/"
      },
      {
        img: {
          url: 'http://dewwwald.com/assets/img/the-alter-native.jpg',
          alt: 'dewwwald web development - The alter native website screenshot'
        },
        title: 'The Alter Native',
        description: "This was the first website that I ever built under the guidance of my Fixate mentor, using ProcessWire as a CMS. <br/><br/><small><em>Designed by Fixate and coding done while employed there.</em></small>",
        link: "http://zanelemodiba.com/"
      },
      {
        img: {
          url: 'http://dewwwald.com/assets/img/dare-to-explore.jpg',
          alt: 'dewwwald web development - Dare to explore website screenshot'
        },
        title: 'Dare To Explore',
        description: "One of my favourite websites I've worked on, also built with ProcessWire. This project stretched me with implementing my first ever web forms. <br/><br/><small><em>Designed by Fixate and coding done while employed there.</em></small>",
        link: "http://daretoexplore.co.za/"
      },
      {
        img: {
          url: 'http://dewwwald.com/assets/img/monarchandco.jpg',
          alt: 'dewwwald web development - Monarch and co website screenshot'
        },
        title: 'Monarch & Co',
        description: "A project built on ProcessWire. During the course of this project I had to migrate a lot of data from Wordpress and create a multi-site, unfortunately that feature was never deployed. <br/><br/><small><em>Design by Fixate and coding done while employed there.</em></small>",
        link: "http://monarchandco.com/"
      },
      {
        img: {
          url: 'http://dewwwald.com/assets/img/click-to-drive.jpg',
          alt: 'dewwwald web development - Click to drive website screenshot'
        },
        title: 'Click To Drive',
        description: "My first website working in a team. I focused on the front end development while my colleague focused on the back end. <br/><br/><small><em>Design by CubeZoo and coding done while employed there.</em></small>",
        link: "http://clicktodrive.co.za/"
      },
    ];
  }
}
