import { Component, Inject } from '@angular/core';

import { ContactForm } from '../../model/contact-form.model';

import { MailableService } from '../services/mailable.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'form-contact',
  providers: [
    MailableService,
  ],
  templateUrl: './form-content.component.html',
})
export class FormContactComponent
{
  model = new ContactForm('Your name', 'Your email address', 'Your message');
  submitted = false;
  active = true;

  onSubmit() {
    this.submitted = true;
    var emailMessage = 'contacted from website<br>'+
      '   name: '+this.model.name+'<br>'+
      '  email: '+this.model.email+'<br>'+
      'message: '+this.model.message+'<br>';
    this.mailable.sendMail('/api/mail/contact', {message: emailMessage});
  }

  newContact() {
    this.model = new ContactForm('', '', '');
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }

  constructor (private mailable: MailableService) {
    this.newContact();
  }
}
