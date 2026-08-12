import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Signal, ViewChild, afterRenderEffect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, map, of, switchMap } from 'rxjs';
import { marked } from 'marked';
import mermaid from 'mermaid';

interface ArticlePostConfig {
  readonly title: string;
  readonly path: string;
}

const posts: Record<string, ArticlePostConfig> = {
  'prompt-injection-fake-hacker-site': {
    title: 'Hiding an Attack Inside a Webpage, Then Asking My AI to Read It',
    path: 'assets/posts/prompt-injection-fake-hacker-site.md',
  },
  'directed-decoding-the-other-50-percent': {
    title: 'Directed Decoding: The Other 50 Percent',
    path: 'assets/posts/directed-decoding-the-other-50-percent.md',
  },
};

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    background: 'transparent',
    primaryColor: '#333333',
    primaryBorderColor: '#acded5',
    primaryTextColor: '#e6e6e6',
    lineColor: '#acded5',
    secondaryColor: '#2e2e2e',
    tertiaryColor: '#404040',
    fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
    fontSize: '14px',
  },
});

/** Mermaid source can contain characters marked's HTML-escaping would mangle, so it
 * travels through the DOM as base64 and is decoded again right before rendering. */
function encodeMermaidSource(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
  return btoa(binary);
}

function decodeMermaidSource(encoded: string): string {
  const binary = atob(encoded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

@Component({
  selector: 'dewwwald-article-post-page',
  standalone: true,
  imports: [NgIf, RouterLink],
  template: `
    <main class="article-post-page">
      <nav class="article-post-page__nav" aria-label="Article navigation">
        <a routerLink="/articles">&larr; All writing</a>
      </nav>

      <article class="article-post-document" *ngIf="postHtml() as postHtml; else loading">
        <div class="article-post-document__chrome">
          <a class="chrome-dot chrome-dot--close" routerLink="/articles" aria-label="Close and return to writing list" title="Close"></a>
          <span class="chrome-dot chrome-dot--minimize" aria-hidden="true"></span>
          <span class="chrome-dot chrome-dot--zoom" aria-hidden="true"></span>
        </div>
        <div #articleBody class="article-post-document__body" [innerHTML]="postHtml"></div>
      </article>

      <ng-template #loading>
        <article class="article-post-document">
          <div class="article-post-document__chrome" aria-hidden="true">
            <span></span><span></span><span></span>
          </div>
          <div class="article-post-document__body">
            <p>Loading post...</p>
          </div>
        </article>
      </ng-template>
    </main>
  `,
})
export class ArticlePostPageComponent {
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private readonly sanitizer = inject(DomSanitizer);

  @ViewChild('articleBody') private articleBody?: ElementRef<HTMLElement>;

  protected readonly postHtml: Signal<SafeHtml | undefined>;

  constructor() {
    marked.use({
      gfm: true,
      breaks: false,
      renderer: {
        code({ text, lang }) {
          if (lang === 'mermaid') {
            return `<div class="mermaid-diagram" data-mermaid-source="${encodeMermaidSource(text)}"></div>`;
          }
          return false;
        },
      },
    });

    this.postHtml = toSignal(
      this.route.paramMap.pipe(
        map((params) => posts[params.get('slug') ?? '']),
        switchMap((post) => {
          if (!post) {
            return of(this.sanitizer.bypassSecurityTrustHtml('<h1>Not found</h1><p>This post does not exist.</p>'));
          }
          return this.http.get(post.path, { responseType: 'text' }).pipe(
            map((markdown) => marked.parse(markdown) as string),
            map((html) => this.sanitizer.bypassSecurityTrustHtml(html)),
            catchError(() =>
              of(this.sanitizer.bypassSecurityTrustHtml(`<h1>${post.title}</h1><p>This post could not be loaded.</p>`)),
            ),
          );
        }),
      ),
    );

    afterRenderEffect(() => {
      if (this.postHtml()) {
        void this.renderMermaidDiagrams();
      }
    });
  }

  private async renderMermaidDiagrams(): Promise<void> {
    const container = this.articleBody?.nativeElement;
    if (!container) {
      return;
    }

    const diagrams = Array.from(
      container.querySelectorAll<HTMLElement>('.mermaid-diagram[data-mermaid-source]:not([data-mermaid-rendered])'),
    );

    for (const el of diagrams) {
      const encoded = el.dataset['mermaidSource'];
      if (!encoded) {
        continue;
      }
      el.dataset['mermaidRendered'] = 'true';
      try {
        const id = `mermaid-${Math.random().toString(36).slice(2)}`;
        const { svg } = await mermaid.render(id, decodeMermaidSource(encoded));
        el.innerHTML = svg;
      } catch (err) {
        console.error('Failed to render mermaid diagram', err);
      }
    }
  }
}
