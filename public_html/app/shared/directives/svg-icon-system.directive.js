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
var svg_icon_system_service_1 = require('../services/svg-icon-system.service');
var SvgIconDirective = (function () {
    function SvgIconDirective(el, svgSystem) {
        this.el = el.nativeElement;
        this.svgSystem = svgSystem;
    }
    SvgIconDirective.prototype.icons = function () {
        console.log(this.iconName);
        this.iconDef = this.svgSystem.getIcon('github');
        this.el.innerHTML = '<g><path d="' + this.iconDef + '"></path></g>';
    };
    SvgIconDirective.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input('iconName'), 
        __metadata('design:type', Object)
    ], SvgIconDirective.prototype, "iconName", void 0);
    SvgIconDirective = __decorate([
        core_1.Directive({
            selector: '[iconDirr]',
            providers: [
                svg_icon_system_service_1.SvgIconsSystemService,
            ]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, svg_icon_system_service_1.SvgIconsSystemService])
    ], SvgIconDirective);
    return SvgIconDirective;
}());
exports.SvgIconDirective = SvgIconDirective;
//# sourceMappingURL=svg-icon-system.directive.js.map