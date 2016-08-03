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
var core_1 = require('@angular/core');
var WhatService = (function () {
    function WhatService() {
    }
    WhatService.prototype.getPortfolioItems = function () {
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
    };
    WhatService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], WhatService);
    return WhatService;
}());
exports.WhatService = WhatService;
//# sourceMappingURL=what.service.js.map