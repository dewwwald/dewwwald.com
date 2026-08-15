import { NgFor } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { articles } from '../data/articles';

/** A single-select list, arrow-key navigable like the interactive prompts
 * npm's own CLI tools (e.g. `npm init`) show in a terminal - a filled dot
 * marks the current selection, arrow keys move it, and enter opens it. */
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

              <div class="article-post-cat">
                <span class="terminal-nav__prompt">$</span><span class="terminal-nav__command">ls ./articles</span>
              </div>

              <ul class="article-list" role="listbox" aria-label="Articles">
                <li
                  *ngFor="let article of articles; let i = index"
                  class="article-list__item"
                  [class.article-list__item--selected]="i === selectedIndex()"
                  role="option"
                  [attr.aria-selected]="i === selectedIndex()"
                >
                  <a [routerLink]="['/articles', article.slug]" (mouseenter)="selectedIndex.set(i)">
                    <h2><span class="article-list__dot" aria-hidden="true">{{ i === selectedIndex() ? '●' : '○' }}</span>{{ article.title }}</h2>
                  </a>
                  <p>{{ article.summary }}</p>
                </li>
              </ul>

              <div class="article-list__hint">
                <span class="terminal-nav__prompt">↑↓</span><span class="terminal-nav__comment">navigate</span>
                <span class="terminal-nav__prompt">↵</span><span class="terminal-nav__comment">enter to read</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </main>
  `,
})
export class ArticlesComponent {
  protected readonly articles = articles;
  protected readonly selectedIndex = signal(0);

  constructor(private readonly router: Router) {}

  @HostListener('window:keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectedIndex.update((i) => Math.min(i + 1, this.articles.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectedIndex.update((i) => Math.max(i - 1, 0));
    } else if (event.key === 'Enter') {
      const article = this.articles[this.selectedIndex()];
      if (article) {
        this.router.navigate(['/articles', article.slug]);
      }
    }
  }
}
