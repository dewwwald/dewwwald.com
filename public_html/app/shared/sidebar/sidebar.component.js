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
var sidebar_service_1 = require("./sidebar.service");
var SidebarComponent = (function () {
    function SidebarComponent(sidebarService, element, renderer) {
        this.element = element.nativeElement;
        this.renderer = renderer;
        this.sidebarService = sidebarService;
    }
    SidebarComponent.prototype.ngOnInit = function () {
        this.navItems = this.sidebarService.getNavItems();
        this.logoUrl = this.sidebarService.getLogoUrl();
        this.listenForExit();
    };
    SidebarComponent.prototype.toggleNavigationIn = function () {
        if (this.element.className.indexOf('sidebar--in') == -1) {
            this.element.className = this.element.className + ' sidebar--in';
        }
    };
    SidebarComponent.prototype.toggleNavigationOut = function () {
        this.element.className = this.element.className.replace('sidebar--in', '').trim();
    };
    SidebarComponent.prototype.listenForExit = function () {
        var _this = this;
        this.renderer.listen(this.element, 'mouseleave', function () {
            return _this.toggleNavigationOut();
        });
    };
    return SidebarComponent;
}());
SidebarComponent = __decorate([
    core_1.Component({
        selector: 'sidebar',
        templateUrl: 'app/shared/sidebar/sidebar.component.html',
        providers: [sidebar_service_1.SidebarService]
    }),
    __metadata("design:paramtypes", [sidebar_service_1.SidebarService, core_1.ElementRef, core_1.Renderer])
], SidebarComponent);
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=sidebar.component.js.map