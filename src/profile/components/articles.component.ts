import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { articles } from '../data/articles';

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
    </main>
  `,
})
export class ArticlesComponent {
  protected readonly articles = articles;
}
