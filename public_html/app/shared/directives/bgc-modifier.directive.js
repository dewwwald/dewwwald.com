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
var BgcModifierDirective = (function () {
    function BgcModifierDirective(el) {
        this.el = el.nativeElement;
    }
    BgcModifierDirective.prototype.ngOnInit = function () {
        this.setColors();
        this.params();
        if (typeof this.opacity !== 'undefined') {
            this.el.style.backgroundColor = 'rgba(' + this.hexToRgb(this.colors[this.index % 3].hex) + ', ' + this.opacity + ')';
        }
        else {
            this.el.classNamr += ' ' + this.colors[this.index % 3].class;
        }
    };
    BgcModifierDirective.prototype.hexToRgb = function (hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? parseInt(result[1], 16) + ',' + parseInt(result[2], 16) + ',' + parseInt(result[3], 16) : null;
    };
    BgcModifierDirective.prototype.params = function () {
        var _this = this;
        var params = this.colorPar.split(',');
        params.forEach(function (curr, i) {
            switch (i) {
                case 0:
                    _this.index = curr.trim();
                    break;
                case 1:
                    _this.opacity = curr.trim();
                    break;
            }
        });
    };
    BgcModifierDirective.prototype.setColors = function () {
        this.colors = [
            { class: 'bgc--secondary', hex: '#edd54f' },
            { class: 'bgc--primary', hex: '#acded5' },
            { class: 'bgc--tertiary', hex: '#f5795f' }
        ];
    };
    return BgcModifierDirective;
}());
__decorate([
    core_1.Input('bgcModifier'),
    __metadata("design:type", Object)
], BgcModifierDirective.prototype, "colorPar", void 0);
BgcModifierDirective = __decorate([
    core_1.Directive({
        selector: '[bgcModifier]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], BgcModifierDirective);
exports.BgcModifierDirective = BgcModifierDirective;
//# sourceMappingURL=bgc-modifier.directive.js.map