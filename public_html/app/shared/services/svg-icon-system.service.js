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
var SvgIconsSystemService = (function () {
    function SvgIconsSystemService() {
        this.icons = {
            github: "M956,560c-141.3,0-256,115.1-256,257.1c0,113.5,73.3,209.9,175.1,243.9 c12.8,2.3,17.5-5.6,17.5-12.4c0-6.1-0.2-22.3-0.4-43.7c-71.2,15.6-86.3-34.5-86.3-34.5c-11.6-29.6-28.4-37.6-28.4-37.6 c-23.3-15.9,1.8-15.6,1.8-15.6c25.7,1.8,39.2,26.5,39.2,26.5c22.8,39.3,59.9,27.9,74.5,21.3c2.3-16.6,8.9-27.9,16.3-34.3 c-56.8-6.5-116.6-28.5-116.6-127c0-28.1,10-51,26.3-69c-2.6-6.5-11.4-32.6,2.5-68c0,0,21.5-6.9,70.4,26.3 c20.4-5.7,42.3-8.6,64.1-8.7c21.7,0.1,43.7,3,64.1,8.7c48.9-33.2,70.3-26.3,70.3-26.3c14,35.3,5.2,61.5,2.6,68 c16.4,18,26.3,40.9,26.3,69c0,98.7-59.9,120.4-116.9,126.8c9.2,7.9,17.4,23.6,17.4,47.5c0,34.4-0.3,62.1-0.3,70.5 c0,6.9,4.6,14.9,17.6,12.3c101.7-34,174.9-130.3,174.9-243.8C1212,675.1,1097.4,560,956,560 ",
            twitter: "M256,0C114.6,0,0,114.6,0,256c0,141.4,114.6,256,256,256c141.4,0,256-114.6,256-256 C512,114.6,397.4,0,256,0z M180.9,377.9h-52.3V212.3h52.3V377.9z M153.5,191.6h-0.4c-18.9,0-31.2-12.7-31.2-28.7 c0-16.3,12.6-28.8,31.9-28.8s31.2,12.4,31.5,28.8C185.4,178.9,173.1,191.6,153.5,191.6z M390.1,377.9h-59.3v-85.8 c0-22.4-9.3-37.7-29.7-37.7c-15.6,0-24.2,10.4-28.3,20.3c-1.5,3.6-1.3,8.6-1.3,13.5v89.6h-58.7c0,0,0.8-151.8,0-165.6h58.7v26 c3.5-11.3,22.2-27.6,52.2-27.6c37.1,0,66.3,23.8,66.3,75.1V377.9z",
            linkedin: "M256,0C114.6,0,0,114.6,0,256c0,141.4,114.6,256,256,256s256-114.6,256-256C512,114.6,397.4,0,256,0z M373.3,194.4c0.1,2.6,0.1,5.3,0.1,8.1c0,81.9-60.8,176.4-172.1,176.4c-34.1,0-65.9-10.3-92.7-27.9c4.7,0.6,9.6,0.9,14.4,0.9 c28.3,0,54.4-9.9,75.1-26.5c-26.5-0.5-48.8-18.4-56.5-43.1c3.7,0.7,7.5,1.1,11.4,1.1c5.6,0,10.9-0.8,15.9-2.2 c-27.7-5.7-48.5-30.8-48.5-60.8v-0.8c8.2,4.6,17.5,7.4,27.4,7.7c-16.2-11.1-26.9-30.1-26.9-51.6c0-11.4,3-22,8.2-31.2 c29.8,37.6,74.4,62.2,124.7,64.8c-1-4.5-1.6-9.3-1.6-14.1c0-34.2,27.1-62,60.5-62c17.4,0,33.1,7.5,44.1,19.6 c13.8-2.7,26.8-7.9,38.4-15c-4.5,14.5-14.1,26.6-26.6,34.3c12.2-1.5,23.9-4.8,34.7-9.8C395.3,174.7,385.1,185.6,373.3,194.4z",
        };
    }
    SvgIconsSystemService.prototype.getIcon = function ($icon) {
        return this.icons[$icon];
    };
    return SvgIconsSystemService;
}());
SvgIconsSystemService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], SvgIconsSystemService);
exports.SvgIconsSystemService = SvgIconsSystemService;
//# sourceMappingURL=svg-icon-system.service.js.map