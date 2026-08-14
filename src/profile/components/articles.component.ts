import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { articles } from '../data/articles';

@Component({
  selector: 'dewwwald-articles',
  standalone: true,
  imports: [NgFor, RouterLink],
  template: `
    <main class="article-post-page">
      <div class="terminal-window">
        <div class="terminal-window__head">
          <nav class="terminal-nav" aria-label="Site navigation">
            <a class="terminal-nav__body" routerLink="/about">
              <span class="terminal-nav__prompt">$</span><span class="terminal-nav__command">cd $HOME</span>
              <span class="terminal-nav__comment"># back home</span>
            </a>
          </nav>
        </div>

        <div class="terminal-window__panes">
          <article class="terminal-window__pane terminal-window__pane--article">
            <div class="article-post-document__body">
              <h1>
                Writing <small>ideas I am thinking through</small>
              </h1>
              <ng-container *ngFor="let article of articles">
                <h2><a [routerLink]="['/articles', article.slug]">{{ article.title }}</a></h2>
                <p>{{ article.summary }}</p>
              </ng-container>
            </div>
          </article>
        </div>
      </div>
    </main>
  `,
})
export class ArticlesComponent {
  protected readonly articles = articles;
}
