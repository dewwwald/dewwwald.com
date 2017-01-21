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
var contact_form_model_1 = require("../../model/contact-form.model");
var mailable_service_1 = require("../services/mailable.service");
var FormContactComponent = (function () {
    function FormContactComponent(mailable) {
        this.mailable = mailable;
        this.model = new contact_form_model_1.ContactForm('Your name', 'Your email address', 'Your message');
        this.submitted = false;
        this.active = true;
        this.newContact();
    }
    FormContactComponent.prototype.onSubmit = function () {
        this.submitted = true;
        var emailMessage = 'contacted from website<br>' +
            '   name: ' + this.model.name + '<br>' +
            '  email: ' + this.model.email + '<br>' +
            'message: ' + this.model.message + '<br>';
        this.mailable.sendMail('/api/mail/contact', { message: emailMessage });
    };
    FormContactComponent.prototype.newContact = function () {
        var _this = this;
        this.model = new contact_form_model_1.ContactForm('', '', '');
        this.active = false;
        setTimeout(function () { return _this.active = true; }, 0);
    };
    return FormContactComponent;
}());
FormContactComponent = __decorate([
    core_1.Component({
        selector: 'form-contact',
        providers: [
            mailable_service_1.MailableService,
        ],
        templateUrl: 'app/shared/form-content/form-content.component.html',
    }),
    __metadata("design:paramtypes", [mailable_service_1.MailableService])
], FormContactComponent);
exports.FormContactComponent = FormContactComponent;
//# sourceMappingURL=form-content.component.js.map