"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var layout_component_1 = require('./components/layout/layout.component');
var app_routes_1 = require('./config/app.routes');
platform_browser_dynamic_1.bootstrap(layout_component_1.LayoutComponent, [
    app_routes_1.APP_ROUTER_PROVIDER
])
    .catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.js.map