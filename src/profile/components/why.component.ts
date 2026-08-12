import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

import { SinceDirective } from '../directives/since.directive';

interface ProofPoint {
  readonly label: string;
  readonly detail: string;
}

@Component({
  selector: 'dewwwald-why',
  standalone: true,
  imports: [NgFor, SinceDirective],
  template: `
    <main>
      <section class="section--padding bgc--secondary">
        <h1>
          Experience <small>platforms, systems, and technical leadership</small>
        </h1>
        <p>
          <strong><em dewwwaldSince></em></strong> of work experience, and counting!
        </p>
        <p class="flush--bottom">
          I am a senior software engineer and technical leader with 12+ years across startup, acquisition, and
          enterprise environments. Recent Intuit Mailchimp work sits in platform infrastructure, legacy modernization,
          large-scale data processing, microservice migrations, developer productivity, and AI-assisted engineering
          workflows. I care about pragmatic architecture: patterns should help teams deliver real outcomes, not become
          decoration.
        </p>
      </section>
      <section class="section--padding">
        <h1>Evidence
          <small>the work behind the positioning</small>
        </h1>
        <p><em>The through-line is maintainable systems and clearer engineering work.</em></p>
        <div class="proof-grid soft--top" aria-label="Experience evidence">
          <article class="proof-card" *ngFor="let proof of proofPoints">
            <h2>{{ proof.label }}</h2>
            <p>{{ proof.detail }}</p>
          </article>
        </div>
      </section>
    </main>
  `,
})
export class WhyComponent {
  protected readonly proofPoints: readonly ProofPoint[] = [
    {
      label: 'Mailchimp platform systems',
      detail:
        'Recent work sits in platform infrastructure, Kafka, Redshift, Debezium, microservice migrations, and legacy modernization inside Intuit Mailchimp.',
    },
    {
      label: 'Migration performance',
      detail:
        'Improved a microservice migration backfill by moving processed-ID checks from O(n) to O(1) with a hashing-based lookup strategy.',
    },
    {
      label: 'Startup to acquisition',
      detail:
        'BigTeam is the bridge from founding engineer to engineering lead, balancing hands-on delivery, mentorship, contractors, and acquisition pressure.',
    },
    {
      label: 'AI-assisted engineering',
      detail:
        'Built and prototyped AI orchestration, multi-agent workflows, thematic analysis, and developer productivity tools before they became resume keywords.',
    },
    {
      label: 'Pragmatic technical leadership',
      detail:
        'Architecture should earn its keep: DDD, dependency injection, modular boundaries, and Strangler Fig patterns are useful when they make delivery clearer.',
    },
  ];
}
