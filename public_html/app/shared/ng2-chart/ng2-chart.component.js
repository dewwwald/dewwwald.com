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
var ng2_chart_service_1 = require("./ng2-chart.service");
var UniqueNg2ChartComponent = (function () {
    function UniqueNg2ChartComponent(chartService) {
        this.chartService = chartService;
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.barChartType = 'bar';
        this.barChartLegend = false;
        this.barDefaultColor = [
            'rgba(255, 255, 255, 1)',
            'rgba(255, 255, 255, 1)'
        ];
        this.barChartLabels = [];
        this.barChartData = [];
    }
    UniqueNg2ChartComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    UniqueNg2ChartComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    UniqueNg2ChartComponent.prototype.ngOnInit = function () {
        this.chartService.retrieveData(this.dataKey);
        this.barChartLabels = this.chartService.getLabels();
        this.barChartData = this.chartService.getData();
    };
    return UniqueNg2ChartComponent;
}());
__decorate([
    core_1.Input('dataKey'),
    __metadata("design:type", String)
], UniqueNg2ChartComponent.prototype, "dataKey", void 0);
UniqueNg2ChartComponent = __decorate([
    core_1.Component({
        selector: 'unique-ng2-chart',
        templateUrl: 'app/shared/ng2-chart/ng2-chart.template.html',
        providers: [
            ng2_chart_service_1.Ng2ChartService,
        ]
    }),
    __metadata("design:paramtypes", [ng2_chart_service_1.Ng2ChartService])
], UniqueNg2ChartComponent);
exports.UniqueNg2ChartComponent = UniqueNg2ChartComponent;
//# sourceMappingURL=ng2-chart.component.js.map