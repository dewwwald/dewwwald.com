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
var FullPageDirective = (function () {
    function FullPageDirective(el, window) {
        this.window = window.nativeWindow;
        this.el = el.nativeElement;
        this.setHeight();
    }
    FullPageDirective.prototype._resizeEventListiner = function () {
        this.setHeight();
    };
    FullPageDirective.prototype.setHeight = function () {
        this.el.style.height = 'auto';
        if (this.el.offsetHeight < this.window.innerHeight) {
            this.el.style.height = this.window.innerHeight;
        }
        else {
            this.el.style.minHeight = this.window.innerHeight;
        }
    };
    __decorate([
        core_1.HostListener('window:resize', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], FullPageDirective.prototype, "_resizeEventListiner", null);
    FullPageDirective = __decorate([
        core_1.Directive({
            selector: '[myFullPage]',
            providers: [
                window_service_1.WindowService
            ]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, window_service_1.WindowService])
    ], FullPageDirective);
    return FullPageDirective;
}());
exports.FullPageDirective = FullPageDirective;
//# sourceMappingURL=full-page.directive.js.map