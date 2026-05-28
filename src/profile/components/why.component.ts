import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

import { SinceDirective } from '../directives/since.directive';

interface Skill {
  readonly label: string;
  readonly value: number;
}

@Component({
  selector: 'dewwwald-why',
  standalone: true,
  imports: [NgFor, SinceDirective],
  template: `
    <main>
      <section class="section--padding bgc--tertiary">
        <h1>
          why_ <small>pick me?</small>
        </h1>
        <p>
          <strong><em dewwwaldSince></em></strong> of work experience, and counting!
        </p>
        <p class="flush--bottom">
          I am a senior software engineer and technical leader with experience across startup, acquisition, and
          enterprise environments. My recent work at Intuit Mailchimp sits in platform infrastructure, legacy
          modernization, large-scale data systems, AI-assisted developer workflows, and mentoring engineers through
          complex technical decisions. I care about pragmatic architecture: patterns should help teams deliver real
          outcomes, not become decoration.
        </p>
      </section>
      <section class="section--padding">
        <h1>my focus:
          <small>Platform, AI workflows, and technical leadership</small>
        </h1>
        <p><em>The through-line is maintainable systems and clearer engineering work.</em></p>
        <div class="soft--top chart" aria-label="Skill chart">
          <div class="chart__row" *ngFor="let skill of skills">
            <span class="chart__label">{{ skill.label }}</span>
            <span class="chart__track">
              <span class="chart__bar" [style.width.%]="skill.value"></span>
            </span>
          </div>
        </div>
      </section>
    </main>
  `,
})
export class WhyComponent {
  protected readonly skills: readonly Skill[] = [
    { label: 'Platform modernization', value: 94 },
    { label: 'Legacy migration', value: 90 },
    { label: 'AI workflows', value: 84 },
    { label: 'Technical leadership', value: 88 },
    { label: 'Full-stack systems', value: 92 },
  ];
}
