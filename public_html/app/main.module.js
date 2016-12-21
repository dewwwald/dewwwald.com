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
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
// import { Ng2PageScrollModule } from 'ng2-page-scroll';
var layout_component_1 = require("./components/layout/layout.component");
var sidebar_component_1 = require("./shared/sidebar/sidebar.component");
var main_content_component_1 = require("./shared/main-content/main-content.component");
var home_component_1 = require("./components/home/home.component");
var why_component_1 = require("./components/why/why.component");
var what_component_1 = require("./components/what/what.component");
var when_component_1 = require("./components/when/when.component");
var form_content_component_1 = require("./shared/form-content/form-content.component");
var app_routes_1 = require("./config/app.routes");
var full_height_directive_1 = require("./shared/directives/full-height.directive");
var full_page_directive_1 = require("./shared/directives/full-page.directive");
var svg_icon_system_directive_1 = require("./shared/directives/svg-icon-system.directive");
var half_page_directive_1 = require("./shared/directives/half-page.directive");
var bgc_modifier_directive_1 = require("./shared/directives/bgc-modifier.directive");
var slide_hover_directive_1 = require("./shared/directives/slide-hover.directive");
var image_cover_directive_1 = require("./shared/directives/image-cover.directive");
var since_directive_1 = require("./shared/directives/since.directive");
var chart_directive_1 = require("./shared/directives/chart.directive");
var main_content_directive_1 = require("./shared/main-content/main-content.directive");
var middle_sidebar_directive_1 = require("./shared/sidebar/middle-sidebar.directive");
var MainModule = (function () {
    function MainModule() {
    }
    return MainModule;
}());
MainModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            // Ng2PageScrollModule,
            router_1.RouterModule.forRoot(app_routes_1.routes),
            forms_1.FormsModule,
            http_1.HttpModule,
        ],
        declarations: [
            layout_component_1.LayoutComponent,
            sidebar_component_1.SidebarComponent,
            main_content_component_1.MainContentComponent,
            home_component_1.HomeComponent,
            why_component_1.WhyComponent,
            what_component_1.WhatComponent,
            when_component_1.WhenComponent,
            middle_sidebar_directive_1.AppMenuDirective,
            form_content_component_1.FormContactComponent,
            full_height_directive_1.FullHeightDirective,
            full_page_directive_1.FullPageDirective,
            svg_icon_system_directive_1.SvgIconDirective,
            half_page_directive_1.HalfPageDirective,
            bgc_modifier_directive_1.BgcModifierDirective,
            slide_hover_directive_1.SlideHoverDirective,
            image_cover_directive_1.ImageCoverDirective,
            since_directive_1.SinceDirective,
            main_content_directive_1.AspectsDirective,
            chart_directive_1.BarChartDirective,
        ],
        exports: [layout_component_1.LayoutComponent],
        bootstrap: [layout_component_1.LayoutComponent]
    }),
    __metadata("design:paramtypes", [])
], MainModule);
exports.MainModule = MainModule;
//# sourceMappingURL=main.module.js.map