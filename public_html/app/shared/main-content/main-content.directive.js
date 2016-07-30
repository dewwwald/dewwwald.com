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
var window_service_1 = require('../../services/window.service');
var main_content_service_1 = require('./main-content.service');
var AspectsDirective = (function () {
    function AspectsDirective(el, window, mainContentService) {
        this.checked = false;
        this.window = window.nativeWindow;
        this.mainContentService = mainContentService;
        this.el = el.nativeElement;
    }
    AspectsDirective.prototype.stepOutText = function (attribute, current, i) {
        if (i === void 0) { i = undefined; }
        if (typeof i == 'undefined')
            i = attribute.value.length;
        var _this = this;
        if (i >= 0) {
            var timer = setTimeout(function () {
                var newText = attribute.value.substring(0, i);
                _this.el.childNodes[current].data = newText;
                _this.stepOutText(attribute, current, i - 1);
                clearTimeout(timer);
            }, 175);
        }
        else {
            return this.hideText(current - 1);
        }
    };
    AspectsDirective.prototype.htmlElement = function (attribute, current, i) {
        if (i === void 0) { i = undefined; }
        if (typeof i == 'undefined')
            i = attribute.parse.length;
        var _this = this;
        if (i >= 0) {
            this.stepOutText(this.currentHtml[i], i);
            var timer = setTimeout(function () {
                var newText = attribute.value.substring(0, i);
                _this.el.childNodes[current].data = newText;
                _this.stepOutText(attribute, current, 'localCb');
                clearTimeout(timer);
            }, 175);
        }
        else {
            return this.hideText(current - 1);
        }
    };
    AspectsDirective.prototype.hideText = function (i) {
        if (i === void 0) { i = undefined; }
        if (typeof i == 'undefined')
            i = this.currentHtml.length - 1;
        if (i >= 0) {
            console.log(this.currentHtml[i].type == 'text');
            if (this.currentHtml[i].type == 'text') {
                this.stepOutText(this.currentHtml[i], i);
            }
            else {
                this.htmlElement(this.currentHtml[i], i);
            }
        }
        else {
        }
    };
    AspectsDirective.prototype.textOutIn = function () {
        this.nextAspect = this.mainContentService.nextAspect();
        this.currentHtml = this.mainContentService.parseHtmlText(this.el.childNodes);
        this.hideText();
    };
    AspectsDirective.prototype.loop = function (delay, localCb) {
        var _this = this;
        var timeout = setTimeout(function () {
            clearTimeout(timeout);
            return _this[localCb].call(_this);
        }, delay);
        return;
    };
    AspectsDirective.prototype.ngAfterViewChecked = function () {
        this.html = this.el.innerHTML;
        if (!this.checked) {
            this.checked = !this.checked;
            this.loop(4250 * 0, 'textOutIn');
        }
    };
    AspectsDirective = __decorate([
        core_1.Directive({
            selector: '[aspects]',
            providers: [
                window_service_1.WindowService,
                main_content_service_1.MainContentService
            ]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, window_service_1.WindowService, main_content_service_1.MainContentService])
    ], AspectsDirective);
    return AspectsDirective;
}());
exports.AspectsDirective = AspectsDirective;
//# sourceMappingURL=main-content.directive.js.map