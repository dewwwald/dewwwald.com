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
var SinceDirective = (function () {
    function SinceDirective(el) {
        this.el = el.nativeElement;
        this.since = new Date('Sun Jan 31 2014 08:30:00 GMT+0200 (SAST)');
        this.current = new Date();
    }
    SinceDirective.prototype.ngOnInit = function () {
        this.incrementSince();
    };
    SinceDirective.prototype.incrementSince = function (monthCount) {
        if (monthCount === void 0) { monthCount = 0; }
        var _this = this;
        var years = 0;
        if ((monthCount - monthCount % 12) != 0) {
            years = (monthCount - monthCount % 12) / 12;
        }
        var months = monthCount % 12;
        this.setSince(years, months);
        if (years != (this.current.getYear() - this.since.getYear()) ||
            months != (this.current.getMonth() - this.since.getMonth())) {
            var tI = setTimeout(function () {
                _this.incrementSince.call(_this, monthCount + 1);
                clearTimeout(tI);
            }, 40);
        }
    };
    SinceDirective.prototype.setSince = function (years, months) {
        var value = "";
        if (years > 0) {
            value += years + ' years';
        }
        if (years > 0 && months > 0) {
            value += ' and ' + months + ' months';
        }
        else {
            value += months + ' months';
        }
        this.el.innerHTML = value;
    };
    SinceDirective = __decorate([
        core_1.Directive({
            selector: '[since]',
            providers: [
                window_service_1.WindowService
            ]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], SinceDirective);
    return SinceDirective;
}());
exports.SinceDirective = SinceDirective;
//# sourceMappingURL=since.directive.js.map