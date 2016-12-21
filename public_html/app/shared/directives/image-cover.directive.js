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
var ImageCoverDirective = (function () {
    function ImageCoverDirective(el, window) {
        this.window = window.nativeWindow;
        this.el = el.nativeElement;
        console.log(this.el.innerWidth);
        if (this.el.innerWidth >= this.el.innerHeight) {
            this.orientation = 'horizontal';
        }
        else {
            this.orientation = 'verticle';
        }
    }
    ImageCoverDirective.prototype.imageCover = function () {
        if (this.orientation == 'horizontal') {
        }
        else {
        }
    };
    ImageCoverDirective.prototype._resizeEventListiner = function () {
        this.imageCover();
    };
    ImageCoverDirective.prototype.ngOnInit = function () {
        this.el.style.zIndex = this.zIndex;
        this.imageCover();
    };
    return ImageCoverDirective;
}());
__decorate([
    core_1.Input('zIndex'),
    __metadata("design:type", Number)
], ImageCoverDirective.prototype, "zIndex", void 0);
__decorate([
    core_1.HostListener('window:resize', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ImageCoverDirective.prototype, "_resizeEventListiner", null);
ImageCoverDirective = __decorate([
    core_1.Directive({
        selector: '[imageCover]',
        providers: [
            window_service_1.WindowService
        ]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, window_service_1.WindowService])
], ImageCoverDirective);
exports.ImageCoverDirective = ImageCoverDirective;
//# sourceMappingURL=image-cover.directive.js.map