import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Article {
  readonly title: string;
  readonly summary: string;
  readonly slug: string;
}

@Component({
  selector: 'dewwwald-articles',
  standalone: true,
  imports: [NgFor, RouterLink],
  template: `
    <main>
      <section class="section--padding articles-intro">
        <h1>
          Writing <small>ideas I am thinking through</small>
        </h1>
      </section>
      <section class="section--padding articles-list" aria-label="Articles">
        <article class="article-item" *ngFor="let article of articles">
          <a class="article-item__link" [routerLink]="['/articles', article.slug]">
            <span class="article-item__dot" aria-hidden="true"></span>
            <span class="article-item__text">
              <h2>{{ article.title }}</h2>
              <p>{{ article.summary }}</p>
            </span>
          </a>
        </article>
      </section>
      <section class="section--padding bgc--base-ltr">
        <h1>
          Technical resume <small>the hiring snapshot</small>
        </h1>
        <p>
          The technical version is the primary read: 12+ years across platform modernization, large-scale data
          processing, microservice migrations, pragmatic architecture, and AI-assisted developer workflows. The manager
          version is there for conversations where team leadership is the stronger signal.
        </p>
        <ul class="resume-signals" aria-label="Technical resume signals">
          <li>Intuit Mailchimp platform infrastructure, Kafka, Redshift, Debezium, and legacy modernization.</li>
          <li>Microservice migration backfill performance improved by reducing processed-ID checks from O(n) to O(1).</li>
          <li>BigTeam founding engineer to engineering lead experience through acquisition pressure.</li>
        </ul>
        <p class="flush--bottom">
          <a class="btn btn--base" href="/resume/technical">technical resume</a>
          <a class="btn btn--base" href="/resume/engineering-manager">manager resume</a>
        </p>
      </section>
    </main>
  `,
})
export class ArticlesComponent {
  protected readonly articles: readonly Article[] = [
    {
      title: 'Directed Decoding: The Other 50 Percent',
      summary:
        'A local model turned natural language into a structured query in an hour, and that was only half the problem. The rest was making its output something an enterprise system could actually trust.',
      slug: 'directed-decoding-the-other-50-percent',
    },
    {
      title: 'Hiding an Attack Inside a Webpage, Then Asking My AI to Read It',
      summary:
        'I built a fake hacker site with hidden prompt-injection payloads and pointed my local AI’s web-search tool at it, to see whether it would act on instructions buried in fetched content.',
      slug: 'prompt-injection-fake-hacker-site',
    },
  ];
}
