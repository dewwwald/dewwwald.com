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
var router_1 = require('@angular/router');
var sidebar_component_1 = require('../../shared/sidebar/sidebar.component');
var main_content_component_1 = require('../../shared/main-content/main-content.component');
var full_height_directive_1 = require('../../shared/directives/full-height.directive');
var full_page_directive_1 = require('../../shared/directives/full-page.directive');
var half_page_directive_1 = require('../../shared/directives/half-page.directive');
var bgc_modifier_directive_1 = require('../../shared/directives/bgc-modifier.directive');
var slide_hover_directive_1 = require('../../shared/directives/slide-hover.directive');
var image_cover_directive_1 = require('../../shared/directives/image-cover.directive');
var window_service_1 = require('../../shared/services/window.service');
var what_service_1 = require('./what.service');
var WhatComponent = (function () {
    function WhatComponent(whatService) {
        this.whatService = whatService;
    }
    WhatComponent.prototype.ngOnInit = function () {
        this.setPortfolio();
    };
    WhatComponent.prototype.setPortfolio = function () {
        this.portfolio = this.whatService.getPortfolioItems();
    };
    WhatComponent = __decorate([
        core_1.Component({
            selector: 'main',
            templateUrl: 'app/components/what/what.component.html',
            providers: [
                window_service_1.WindowService,
                what_service_1.WhatService
            ],
            directives: [
                router_1.ROUTER_DIRECTIVES,
                full_height_directive_1.FullHeightDirective,
                full_page_directive_1.FullPageDirective,
                half_page_directive_1.HalfPageDirective,
                sidebar_component_1.SidebarComponent,
                main_content_component_1.MainContentComponent,
                bgc_modifier_directive_1.BgcModifierDirective,
                image_cover_directive_1.ImageCoverDirective,
                slide_hover_directive_1.SlideHoverDirective
            ]
        }), 
        __metadata('design:paramtypes', [what_service_1.WhatService])
    ], WhatComponent);
    return WhatComponent;
}());
exports.WhatComponent = WhatComponent;
//# sourceMappingURL=what.component.js.map