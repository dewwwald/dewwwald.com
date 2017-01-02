"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var WhatService = (function () {
    function WhatService() {
    }
    WhatService.prototype.getPortfolioItems = function () {
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
    };
    return WhatService;
}());
WhatService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], WhatService);
exports.WhatService = WhatService;
//# sourceMappingURL=what.service.js.map