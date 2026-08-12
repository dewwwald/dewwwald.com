import { Component } from '@angular/core';

import { ContactFormComponent } from './contact-form.component';
import { FullPageDirective } from '../directives/full-page.directive';

@Component({
  selector: 'dewwwald-when-where',
  standalone: true,
  imports: [ContactFormComponent, FullPageDirective],
  template: `
    <main>
      <section class="contact-stack">
        <div class="contact-stack__intro bgc--tertiary section--padding">
          <h1>
            Contact <small>start a thoughtful engineering conversation</small>
          </h1>
          <p class="flush--bottom">
            I am open to thoughtful engineering conversations, writing collaborations, platform modernization, data
            infrastructure, AI-assisted workflow, and leadership opportunities where technical judgment and team clarity
            matter. If that sounds aligned, send me a note.
          </p>
        </div>
        <section class="contact-stack__form bgc--base-ltr section--padding">
          <dewwwald-contact-form />
        </section>
      </section>
      <section dewwwaldFullPage class="google-map-wrapper">
        <div class="google-map-overlay">
          <h1>Location <small>Atlanta, Georgia</small></h1>
          <p class="flush--bottom">
            I am currently living in Atlanta, Georgia. But that's the cool thing about what I do,
            I can build with thoughtful teams from anywhere in the world.
          </p>
        </div>
        <iframe
          class="google-map"
          title="Google Map centered on Atlanta, Georgia"
          src="https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1sAtlanta,+Georgia!6i10"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </main>
  `,
})
export class WhenWhereComponent {}
