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
var ng2_page_scroll_1 = require('ng2-page-scroll');
var sidebar_service_1 = require('./sidebar.service');
var full_height_directive_1 = require('../directives/full-height.directive');
var full_page_directive_1 = require('../directives/full-page.directive');
var middle_sidebar_directive_1 = require('./middle-sidebar.directive');
var svg_icon_system_directive_1 = require('../directives/svg-icon-system.directive');
var SidebarComponent = (function () {
    function SidebarComponent(sidebarService) {
        this.sidebarService = sidebarService;
    }
    SidebarComponent.prototype.ngOnInit = function () {
        this.getNavItems();
        this.getLogoUrl();
    };
    SidebarComponent.prototype.getLogoUrl = function () {
        this.logoUrl = this.sidebarService.getLogoUrl();
    };
    SidebarComponent.prototype.getNavItems = function () {
        this.navItems = this.sidebarService.getNavItems();
    };
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'sidebar',
            templateUrl: 'app/shared/sidebar/sidebar.component.html',
            directives: [
                full_height_directive_1.FullHeightDirective,
                full_page_directive_1.FullPageDirective,
                middle_sidebar_directive_1.AppMenuDirective,
                router_1.ROUTER_DIRECTIVES,
                ng2_page_scroll_1.PageScroll,
                svg_icon_system_directive_1.SvgIconDirective,
            ],
            providers: [sidebar_service_1.SidebarService]
        }), 
        __metadata('design:paramtypes', [sidebar_service_1.SidebarService])
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=sidebar.component.js.map