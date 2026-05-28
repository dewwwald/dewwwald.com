import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ContactFormModel {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'dewwwald-contact-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div [hidden]="submitted">
      <form (ngSubmit)="onSubmit()" #contactForm="ngForm" class="gw">
        <fieldset class="g g-2/5 g-palm-1/1">
          <div>
            <label for="name">Name</label>
            <input required id="name" placeholder="your name" [(ngModel)]="model.name" name="name" type="text">
          </div>
          <div>
            <label for="email">Email</label>
            <input required id="email" placeholder="your.email@domain.com" [(ngModel)]="model.email" name="email" type="email">
          </div>
        </fieldset>
        <fieldset class="g g-3/5 g-palm-1/1">
          <label for="message">Message</label>
          <textarea required id="message" placeholder="your message" [(ngModel)]="model.message" name="message" cols="30" rows="10"></textarea>
        </fieldset>
        <fieldset class="g g-1/1 text--left soft--top">
          <button [disabled]="!contactForm.form.valid" class="btn--base" type="submit">SEND ME</button>
        </fieldset>
      </form>
    </div>
    <div [hidden]="!submitted">
      <h2>Thank you for contacting me! I'll get back to you soon.</h2>
      <div class="gw">
        <fieldset class="g g-1/2">
          <div class="push--bottom">
            <label>Name:</label>
            <div>{{ model.name }}</div>
          </div>
          <div class="push--bottom">
            <label>Email:</label>
            <div>{{ model.email }}</div>
          </div>
        </fieldset>
        <fieldset class="g g-1/2">
          <div class="push--bottom">
            <label>Message:</label>
            <div>{{ model.message }}</div>
          </div>
        </fieldset>
        <fieldset class="g g-1/1 text--left soft--top">
          <button class="btn btn--base" type="button" (click)="submitted = false">Resend</button>
        </fieldset>
      </div>
    </div>
  `,
})
export class ContactFormComponent {
  protected submitted = false;
  protected readonly model: ContactFormModel = {
    name: '',
    email: '',
    message: '',
  };

  protected onSubmit(): void {
    this.submitted = true;
  }
}
