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
var login_form_model_1 = require('../../model/login-form.model');
var FormContactComponent = (function () {
    function FormContactComponent() {
        this.model = new login_form_model_1.LoginForm('Your name', 'Your email address', 'Your message');
        this.submitted = false;
        this.active = true;
    }
    FormContactComponent.prototype.onSubmit = function () { this.submitted = true; };
    FormContactComponent.prototype.newHero = function () {
        var _this = this;
        this.model = new login_form_model_1.LoginForm('', '', '');
        this.active = false;
        setTimeout(function () { return _this.active = true; }, 0);
    };
    Object.defineProperty(FormContactComponent.prototype, "diagnostic", {
        // TODO: Remove this when we're done
        get: function () { return JSON.stringify(this.model); },
        enumerable: true,
        configurable: true
    });
    FormContactComponent = __decorate([
        core_1.Component({
            selector: 'form-contact',
            templateUrl: 'app/shared/form-content/form-content.component.html',
        }), 
        __metadata('design:paramtypes', [])
    ], FormContactComponent);
    return FormContactComponent;
}());
exports.FormContactComponent = FormContactComponent;
//# sourceMappingURL=form-content.component.js.map