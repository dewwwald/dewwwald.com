"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('../components/home/home.component');
var why_component_1 = require('../components/why/why.component');
var what_component_1 = require('../components/what/what.component');
var when_component_1 = require('../components/when/when.component');
exports.routes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'who', component: home_component_1.HomeComponent },
    { path: 'why', component: why_component_1.WhyComponent },
    { path: 'what', component: what_component_1.WhatComponent },
    { path: 'when-where', component: when_component_1.WhenComponent },
];
exports.APP_ROUTER_PROVIDER = [
    router_1.provideRouter(exports.routes)
];
//# sourceMappingURL=app.routes.js.map