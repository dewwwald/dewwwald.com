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
var router_1 = require('@angular/router');
var core_2 = require('angular2-google-maps/core');
var sidebar_component_1 = require('../../shared/sidebar/sidebar.component');
var main_content_component_1 = require('../../shared/main-content/main-content.component');
var full_page_directive_1 = require('../../shared/directives/full-page.directive');
var window_service_1 = require('../../shared/services/window.service');
var WhenComponent = (function () {
    function WhenComponent() {
        this.lat = -26.1;
        this.lng = 28.1;
    }
    WhenComponent.prototype.ngOnInit = function () {
        this.mapStyles = [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }];
    };
    WhenComponent = __decorate([
        core_1.Component({
            selector: 'main',
            templateUrl: 'app/components/when/when.component.html',
            providers: [
                window_service_1.WindowService,
                core_2.GOOGLE_MAPS_PROVIDERS,
                core_2.GoogleMapsAPIWrapper,
                core_2.CircleManager,
                core_2.provideLazyMapsAPILoaderConfig({
                    apiKey: 'AIzaSyAOtb8zwoH5NoGfsPBCLpW9pByUnWSGHVw'
                })
            ],
            directives: [
                core_2.GOOGLE_MAPS_DIRECTIVES,
                core_2.SebmGoogleMap,
                core_2.SebmGoogleMapCircle,
                router_1.ROUTER_DIRECTIVES,
                full_page_directive_1.FullPageDirective,
                sidebar_component_1.SidebarComponent,
                main_content_component_1.MainContentComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], WhenComponent);
    return WhenComponent;
}());
exports.WhenComponent = WhenComponent;
//# sourceMappingURL=when.component.js.map