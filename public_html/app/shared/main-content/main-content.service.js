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
var MainContentService = (function () {
    function MainContentService() {
        this.index = 0;
    }
    MainContentService.prototype.parseHtmlText = function (children) {
        var count = 0;
        var obj = [];
        do {
            var type = children[count]
                .toString()
                .toLowerCase()
                .replace(/\[object (html)?(.*)\]/, "$2")
                .replace("element", "");
            if (type == 'text' && children[count].data.trim() != '') {
                obj[count] = {
                    type: type,
                    value: children[count].data.trim()
                };
            }
            else if (type != 'text') {
                obj[count] = {
                    type: 'htmlElement',
                    element: children[count],
                    parse: this.parseHtmlText(children[count].childNodes)
                };
            }
            count++;
        } while (count < children.length);
        return obj;
    };
    MainContentService.prototype.nextAspect = function () {
        if (this.index > 4) {
            this.index = 0;
        }
        var aspect = this.getAspects()[this.index];
        this.index++;
        return aspect;
    };
    MainContentService.prototype.getAspects = function () {
        return [
            [{ value: 'Nice to meet you!', type: 'text' }],
            [{ value: 'Lorem ipsum dolor sit amet', type: 'text' }],
            [{ value: 'Lorem ipsum dolor sit amet', type: 'text' }],
            [{ value: 'Lorem ipsum dolor sit amet', type: 'text' }],
            [{ value: 'Lorem ipsum dolor sit amet', type: 'text' }]
        ];
    };
    return MainContentService;
}());
MainContentService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], MainContentService);
exports.MainContentService = MainContentService;
//# sourceMappingURL=main-content.service.js.map