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
var window_service_1 = require('../services/window.service');
var MiddleSidebarDirective = (function () {
    function MiddleSidebarDirective(el, window, renderer) {
        var _this = this;
        this.renderer = renderer;
        this.window = window.nativeWindow;
        this.el = el.nativeElement;
        this.viewChecked = false;
        this.renderer.listenGlobal('window', 'scroll', function (evt) {
            /**
             * todo, clear call to listenGlobal
             * by calling the return function - unsubscribe
             */
            _this.el.style.top = (_this.window.scrollY + _this.window.innerHeight / 2 - _this.el.offsetHeight / 2) + "px";
        });
    }
    MiddleSidebarDirective.prototype.ngAfterViewChecked = function () {
        if (!this.viewChecked) {
            this.viewChecked = true;
            this.el.style.top = (this.window.scrollY + this.window.innerHeight / 2 - this.el.offsetHeight / 2) + "px";
        }
    };
    MiddleSidebarDirective = __decorate([
        core_1.Directive({
            selector: '[myMiddleSidebar]',
            providers: [
                window_service_1.WindowService,
            ]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, window_service_1.WindowService, core_1.Renderer])
    ], MiddleSidebarDirective);
    return MiddleSidebarDirective;
}());
exports.MiddleSidebarDirective = MiddleSidebarDirective;
//# sourceMappingURL=middle-sidebar.directive.js.map