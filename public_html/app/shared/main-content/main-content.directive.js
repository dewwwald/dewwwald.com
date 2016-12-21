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
var window_service_1 = require("../services/window.service");
var main_content_service_1 = require("./main-content.service");
var AspectsDirective = (function () {
    function AspectsDirective(el, window, mainContentService) {
        this.checked = false;
        this.window = window.nativeWindow;
        this.mainContentService = mainContentService;
        this.el = el.nativeElement;
        this.keystrokes = 75;
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
            }, this.keystrokes);
        }
        else {
            return this.hideText(current - 1);
        }
    };
    AspectsDirective.prototype.stepInText = function (attribute, current, i) {
        if (i === void 0) { i = undefined; }
        if (typeof i == 'undefined')
            i = 0;
        var _this = this;
        if (i <= attribute.value.length) {
            var timer = setTimeout(function () {
                var newText = attribute.value.substring(0, i);
                _this.el.childNodes[current].data = newText;
                _this.stepInText(attribute, current, i + 1);
                clearTimeout(timer);
            }, this.keystrokes);
        }
        else {
            return this.showText(current - 1);
        }
    };
    AspectsDirective.prototype.stepOutParseText = function (attribute, current, parseIndex, attrIndex) {
        if (attrIndex === void 0) { attrIndex = undefined; }
        if (typeof attrIndex == 'undefined')
            attrIndex = attribute.value.length;
        var _this = this;
        if (attrIndex >= 0) {
            var timer = setTimeout(function () {
                var newText = attribute.value.substring(0, attrIndex);
                _this.el.childNodes[current].childNodes[parseIndex].data = newText;
                _this.stepOutParseText(attribute, current, parseIndex, attrIndex - 1);
                clearTimeout(timer);
            }, this.keystrokes);
        }
        else {
            return this.htmlElement(attribute, current, parseIndex - 1);
        }
    };
    AspectsDirective.prototype.htmlElement = function (attribute, current, parseIndex) {
        if (parseIndex === void 0) { parseIndex = undefined; }
        if (typeof parseIndex == 'undefined')
            parseIndex = attribute.parse.length - 1;
        var _this = this;
        if (parseIndex >= 0) {
            this.stepOutParseText(attribute.parse[parseIndex], current, parseIndex);
        }
        else {
            return this.hideText(current - 1);
        }
    };
    AspectsDirective.prototype.showText = function (i) {
        if (i === void 0) { i = undefined; }
        if (typeof i == 'undefined')
            i = this.nextAspect.length - 1;
        if (i >= 0) {
            this.stepInText(this.nextAspect[i], i);
        }
        else {
            this.loop(3000, 'textOutIn');
        }
    };
    AspectsDirective.prototype.hideText = function (i) {
        if (i === void 0) { i = undefined; }
        if (typeof i == 'undefined')
            i = this.currentHtml.length - 1;
        if (i >= 0) {
            if (this.currentHtml[i].type == 'text') {
                this.stepOutText(this.currentHtml[i], i);
            }
            else {
                this.htmlElement(this.currentHtml[i], i);
            }
        }
        else {
            this.showText();
        }
    };
    AspectsDirective.prototype.textOutIn = function () {
        this.nextAspect = this.mainContentService.nextAspect();
        this.currentHtml = this.mainContentService.parseHtmlText(this.el.childNodes);
        this.el.className = this.el.className + ' typing';
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
            this.loop(3000, 'textOutIn');
        }
    };
    return AspectsDirective;
}());
AspectsDirective = __decorate([
    core_1.Directive({
        selector: '[aspects]',
        providers: [
            window_service_1.WindowService,
            main_content_service_1.MainContentService
        ]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, window_service_1.WindowService, main_content_service_1.MainContentService])
], AspectsDirective);
exports.AspectsDirective = AspectsDirective;
//# sourceMappingURL=main-content.directive.js.map