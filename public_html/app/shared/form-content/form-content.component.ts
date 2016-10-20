import { Component, Inject } from '@angular/core';

import { LoginForm }    from '../../model/login-form.model';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'form-contact',
  templateUrl: 'app/shared/form-content/form-content.component.html',
})
export class FormContactComponent
{
  model = new LoginForm('Your name', 'Your email address', 'Your message');
  submitted = false;
  active = true;

  onSubmit() { this.submitted = true; }

  newHero() {
    this.model = new LoginForm('', '', '');
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }

  constructor () {}

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
