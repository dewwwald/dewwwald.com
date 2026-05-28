import { Component } from '@angular/core';

import { ContactFormComponent } from './contact-form.component';
import { FullPageDirective } from '../directives/full-page.directive';

@Component({
  selector: 'dewwwald-when-where',
  standalone: true,
  imports: [ContactFormComponent, FullPageDirective],
  template: `
    <main>
      <section id="when">
        <div class="bgc--secondary section--padding">
          <h1>
            when_ <small>can you get in touch?</small>
          </h1>
          <p class="flush--bottom">
            I am open to thoughtful engineering conversations, writing collaborations, platform work, and leadership
            opportunities where technical judgment and team clarity matter. If that sounds aligned, send me a note.
          </p>
        </div>
        <section class="bgc--base-ltr section--padding">
          <dewwwald-contact-form />
        </section>
      </section>
      <section id="where" dewwwaldFullPage class="google-map-wrapper">
        <div class="google-map-overlay">
          <h1>where_ <small>am I located?</small></h1>
          <p class="flush--bottom">
            I am currently living in Atlanta, Georgia. But that's the cool thing about what I do,
            I can build with thoughtful teams from anywhere in the world.
          </p>
        </div>
        <div class="map-panel" role="img" aria-label="Stylized map location for Atlanta, Georgia"></div>
      </section>
    </main>
  `,
})
export class WhenWhereComponent {}
