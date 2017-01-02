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
var Ng2ChartService = (function () {
    function Ng2ChartService() {
        this.labels = {
            "frontEnd": ['HTML', 'CSS', 'Javascript', 'Angular', 'UI/UX'],
            "backEnd": ['Node.js', 'PHP', 'Web frameworks', 'Automation', 'Web Server']
        };
        this.dataPoints = {
            "frontEnd": [
                {
                    data: [90, 95, 85, 75, 80, 0],
                    backgroundColor: [
                        'rgba(255, 255, 255, .7)',
                        'rgba(255, 255, 255, .7)',
                        'rgba(255, 255, 255, .7)',
                        'rgba(255, 255, 255, .7)',
                        'rgba(255, 255, 255, .7)',
                        'rgba(255, 255, 255, .7)'
                    ],
                },
            ],
            "backEnd": [
                {
                    data: [90, 95, 85, 75, 75, 0],
                    backgroundColor: [
                        'rgba(255, 255, 255, .7)',
                        'rgba(255, 255, 255, .7)',
                        'rgba(255, 255, 255, .7)',
                        'rgba(255, 255, 255, .7)',
                        'rgba(255, 255, 255, .7)',
                        'rgba(255, 255, 255, .7)'
                    ],
                },
            ]
        };
    }
    Ng2ChartService.prototype.getLabels = function () {
        return this.labels[this.dataKey];
    };
    Ng2ChartService.prototype.getData = function () {
        return this.dataPoints[this.dataKey];
    };
    Ng2ChartService.prototype.retrieveData = function (dataKey) {
        this.dataKey = dataKey;
    };
    return Ng2ChartService;
}());
Ng2ChartService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], Ng2ChartService);
exports.Ng2ChartService = Ng2ChartService;
//# sourceMappingURL=ng2-chart.service.js.map