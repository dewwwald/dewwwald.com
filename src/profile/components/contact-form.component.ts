import { Component } from '@angular/core';

@Component({
  selector: 'dewwwald-contact-form',
  standalone: true,
  template: `
    <section class="contact-cta" aria-label="Contact options">
      <div class="contact-cta__actions">
        <a class="btn btn--base" href="mailto:laubscher.dewald@gmail.com?subject=Senior%20platform%20engineering%20conversation">
          Email me
        </a>
        <a class="btn btn--base" target="_blank" rel="noopener noreferrer" href="https://za.linkedin.com/in/dewaldlaubscher">
          LinkedIn
        </a>
        <a class="btn btn--base" target="_blank" rel="noopener noreferrer" href="https://github.com/dewwwald">
          GitHub
        </a>
      </div>

      <p class="contact-cta__small">
        Prefer resumes first?
        <a href="/resume/technical">Technical resume</a>
        and
        <a href="/resume/engineering-manager">engineering manager resume</a>
        are rendered on this site with raw Markdown available.
      </p>
    </section>
  `,
})
export class ContactFormComponent {}
