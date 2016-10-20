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
var main_content_service_1 = require('./main-content.service');
var MainContentComponent = (function () {
    function MainContentComponent(mainContentService) {
        this.mainContentService = mainContentService;
    }
    MainContentComponent.prototype.ngOnInit = function () { };
    MainContentComponent = __decorate([
        core_1.Component({
            selector: 'persona',
            templateUrl: 'app/shared/main-content/main-content.component.html',
            providers: [main_content_service_1.MainContentService]
        }), 
        __metadata('design:paramtypes', [main_content_service_1.MainContentService])
    ], MainContentComponent);
    return MainContentComponent;
}());
exports.MainContentComponent = MainContentComponent;
//# sourceMappingURL=main-content.component.js.map