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
var document_service_1 = require("../services/document.service");
var FullHeightDirective = (function () {
    function FullHeightDirective(el, doc) {
        this.doc = doc.nativeDocument;
        this.el = el.nativeElement;
        this.el.style.height = this.doc.innerHeight;
    }
    FullHeightDirective.prototype._resizeEventListiner = function () {
        this.el.style.height = this.doc.innerHeight;
    };
    return FullHeightDirective;
}());
__decorate([
    core_1.HostListener('window:resize', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FullHeightDirective.prototype, "_resizeEventListiner", null);
FullHeightDirective = __decorate([
    core_1.Directive({
        selector: '[myFullHeight]',
        providers: [
            document_service_1.DocumentService
        ]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, document_service_1.DocumentService])
], FullHeightDirective);
exports.FullHeightDirective = FullHeightDirective;
//# sourceMappingURL=full-height.directive.js.map