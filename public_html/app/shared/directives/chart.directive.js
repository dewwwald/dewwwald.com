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
var bar_service_1 = require('../services/bar.service');
var BarChartDirective = (function () {
    function BarChartDirective(el, window, graphService) {
        this.window = window.nativeWindow;
        this.bars = graphService.getBar();
        this.canvas = el.nativeElement;
        this.context = this.canvas.getContext("2d");
    }
    BarChartDirective.prototype.setupDimentions = function () {
        this.canvas.style.width = '100%';
        var ratioheight = this.canvas.offsetWidth * this.heightRatio;
        ratioheight = ratioheight - ratioheight % 1;
        this.canvas.style.height = ratioheight + 'px';
        this.canvas.style.width = this.canvas.offsetWidth - this.canvas.offsetWidth % 1;
        this.width = this.canvas.offsetWidth;
        this.height = this.canvas.offsetHeight;
        this.canvas.setAttribute('width', this.width);
        this.canvas.setAttribute('height', this.height);
    };
    BarChartDirective.prototype.setupGraph = function () {
        this.context.fillStyle = "#000000";
        this.context.fillRect(0, this.height - 30, this.width, 1);
        this.gut = 30;
        this.barHeight = this.height - 30;
        this.barWidth = ((this.width - this.gut * 4) / 3);
        this.barWidth = this.barWidth - this.barWidth % 1;
    };
    BarChartDirective.prototype.animateBar = function (index) {
        var _this = this;
        var i = index;
        var finalHeight = this.barHeight / 100 * this.bars[i].height;
        finalHeight = finalHeight - finalHeight % 1;
        var step = 1;
        var interval = setInterval(function () {
            _this.context.fillStyle = "#aaaaaa";
            _this.context.fillRect(_this.gut * (i + 1) + _this.barWidth * i, _this.barHeight - step, _this.barWidth, 1);
            if (finalHeight == step) {
                clearInterval(interval);
            }
            step = step + 1;
        }, 2);
    };
    BarChartDirective.prototype.drawBars = function () {
        for (var i = this.bars.length - 1; i >= 0; i--) {
            this.animateBar(i);
        }
    };
    BarChartDirective.prototype.ngOnInit = function () {
        this.setupDimentions();
        this.setupGraph();
        this.drawBars();
    };
    __decorate([
        core_1.Input('heightRatio'), 
        __metadata('design:type', Object)
    ], BarChartDirective.prototype, "heightRatio", void 0);
    __decorate([
        core_1.Input('lengths'), 
        __metadata('design:type', Object)
    ], BarChartDirective.prototype, "lengths", void 0);
    BarChartDirective = __decorate([
        core_1.Directive({
            selector: '[barChart]',
            providers: [
                bar_service_1.GraphService
            ]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, window_service_1.WindowService, bar_service_1.GraphService])
    ], BarChartDirective);
    return BarChartDirective;
}());
exports.BarChartDirective = BarChartDirective;
//# sourceMappingURL=chart.directive.js.map