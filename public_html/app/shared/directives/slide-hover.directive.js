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
var SlideHoverDirective = (function () {
    function SlideHoverDirective(el, window) {
        this.window = window.nativeWindow;
        this.el = el.nativeElement;
        this.delay = 250;
    }
    SlideHoverDirective.prototype.onMouseEnter = function (event) {
        this.top = this.el.offsetTop - this.window.scrollY;
        this.right = this.el.offsetLeft + this.el.offsetWidth;
        this.bottom = this.el.offsetTop - this.window.scrollY + this.el.offsetHeight;
        this.left = this.el.offsetLeft;
        var leftDiff = event.clientX - this.left;
        var rightDiff = this.right - event.clientX;
        var topDiff = event.clientY - this.top;
        var bottomDiff = this.bottom - event.clientY;
        var closerToBottom = bottomDiff < leftDiff && bottomDiff < rightDiff && bottomDiff < topDiff;
        var closerToRight = rightDiff < leftDiff && rightDiff < bottomDiff && rightDiff < topDiff;
        var closerToLeft = leftDiff < bottomDiff && leftDiff < rightDiff && leftDiff < topDiff;
        if (closerToBottom) {
            this.el.className += ' portfolio-item-in-bottom';
        }
        else if (closerToRight) {
            this.el.className += ' portfolio-item-in-right';
        }
        else if (closerToLeft) {
            this.el.className += ' portfolio-item-in-left';
        }
        else {
            this.el.className += ' portfolio-item-in-top';
        }
    };
    SlideHoverDirective.prototype.onMouseLeave = function (event) {
        var regexClass = new RegExp('portfolio-item-in-[a-z]*');
        this.el.className = 'portfolio-item-hold ' + this.el.className.replace(regexClass, '').trim();
        this.top = this.el.offsetTop - this.window.scrollY;
        this.right = this.el.offsetLeft + this.el.offsetWidth;
        this.bottom = this.el.offsetTop - this.window.scrollY + this.el.offsetHeight;
        this.left = this.el.offsetLeft;
        var leftDiff = this.left - event.clientX;
        var rightDiff = event.clientX - this.right;
        var topDiff = this.top - event.clientY;
        var bottomDiff = event.clientY - this.bottom;
        var closerToBottom = bottomDiff < leftDiff && bottomDiff < rightDiff && bottomDiff < topDiff;
        var closerToRight = rightDiff < leftDiff && rightDiff < bottomDiff && rightDiff < topDiff;
        var closerToLeft = leftDiff < bottomDiff && leftDiff < rightDiff && leftDiff < topDiff;
        if (closerToBottom) {
            this.el.className = this.el.className.replace('portfolio-item-hold', '') + ' portfolio-item-out-bottom';
        }
        else if (closerToRight) {
            this.el.className = this.el.className.replace('portfolio-item-hold', '') + ' portfolio-item-out-right';
        }
        else if (closerToLeft) {
            this.el.className = this.el.className.replace('portfolio-item-hold', '') + ' portfolio-item-out-left';
        }
        else {
            this.el.className = this.el.className.replace('portfolio-item-hold', '') + ' portfolio-item-out-top';
        }
        var regexOutClass = new RegExp('portfolio-item-out-[a-z]*');
        var _this = this;
        setTimeout(function () {
            _this.el.className = _this.el.className.replace(regexOutClass, '').trim();
        }, this.delay);
    };
    __decorate([
        core_1.HostListener('mouseenter', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], SlideHoverDirective.prototype, "onMouseEnter", null);
    __decorate([
        core_1.HostListener('mouseleave', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], SlideHoverDirective.prototype, "onMouseLeave", null);
    SlideHoverDirective = __decorate([
        core_1.Directive({
            selector: '[slideHover]',
            providers: [
                window_service_1.WindowService
            ]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, window_service_1.WindowService])
    ], SlideHoverDirective);
    return SlideHoverDirective;
}());
exports.SlideHoverDirective = SlideHoverDirective;
//# sourceMappingURL=slide-hover.directive.js.map