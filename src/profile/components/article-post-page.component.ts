import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, Signal, ViewChild, afterRenderEffect, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, map, of, switchMap } from 'rxjs';
import { marked } from 'marked';
import mermaid from 'mermaid';

// Generated at build/serve time from git history (see
// scripts/generate-post-meta.mjs and package.json's pre* hooks) - never
// hand-maintained, so it can't go stale.
import postDates from '../../generated/post-dates.json';
import { ArticleMeta, PanelImageConfig, articleBySlug } from '../data/articles';
import { AnalyticsService } from '../services/analytics.service';

/** Reading-time engagement is reported at these cumulative scroll depths -
 * mirrors the milestones GA's own reports expect (25/50/75/100). */
const SCROLL_DEPTH_THRESHOLDS = [25, 50, 75, 100];

interface PanelImage {
  /** The element this image's position tracks - a heading for a screenshot
   * or diagram, the paragraph itself for a quote. */
  readonly heading: HTMLElement;
  readonly el: HTMLElement;
  /** Marks the image's spot in the article's own flow - a diagram's actual
   * original position; a screenshot's assigned one, right after the heading
   * it tracks; a quote's, right before the paragraph it's pulled from -
   * none of these have anywhere else to go. Below the breakpoint where
   * there's no pane to feature it in, it moves back here instead - no
   * grabbing, no scroll-tracking, just inline content. */
  readonly placeholder: Comment;
}

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
      <div class="terminal-window">
        <div class="terminal-window__head">
          <nav class="terminal-nav" aria-label="Article navigation">
            <a class="terminal-nav__body" routerLink="/articles">
              <span class="terminal-nav__prompt">$</span><span class="terminal-nav__command">cd $HOME/articles/..</span>
              <span class="terminal-nav__comment"># back to all articles</span>
            </a>
          </nav>
        </div>

        <div class="terminal-window__panes">
          <article class="terminal-window__pane terminal-window__pane--article" *ngIf="postHtml() as postHtml; else loading">
            <div class="article-post-document__body">
              <div class="article-post-cat" *ngIf="postMeta() as meta">
                <span class="terminal-nav__prompt">$</span><span class="terminal-nav__command">cat ./{{ meta.slug }}.md</span>
              </div>
              <div #articleBody [innerHTML]="postHtml"></div>
              <div class="article-post-meta" *ngIf="postMeta() as meta">
                <span class="terminal-nav__prompt">$</span><span class="terminal-nav__command">stat {{ meta.slug }}.md</span>
                <div class="article-post-meta__row">created &nbsp;{{ meta.createdAt }}</div>
                <div class="article-post-meta__row" *ngIf="meta.updatedAt">edited &nbsp;&nbsp;{{ meta.updatedAt }}</div>
                <div class="article-post-meta__cmd">
                  <span class="terminal-nav__prompt">$</span><span class="terminal-nav__command">whoami</span>
                </div>
                <div class="article-post-meta__row">dewald laubscher</div>
              </div>
            </div>
          </article>

          <ng-template #loading>
            <article class="terminal-window__pane terminal-window__pane--article">
              <div class="article-post-document__body">
                <p>Loading post...</p>
              </div>
            </article>
          </ng-template>

          <aside class="terminal-window__pane terminal-window__pane--image" *ngIf="hasPanelImages()" aria-hidden="true">
            <div #panelLayer class="anchored-diagram-layer"></div>
          </aside>
        </div>
      </div>
    </main>
  `,
})
export class ArticlePostPageComponent implements OnDestroy {
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly titleService = inject(Title);
  private readonly analytics = inject(AnalyticsService);

  @ViewChild('articleBody') private articleBody?: ElementRef<HTMLElement>;
  @ViewChild('panelLayer') private panelLayer?: ElementRef<HTMLElement>;

  protected readonly postHtml: Signal<SafeHtml | undefined>;
  protected readonly postMeta: Signal<{ slug: string; createdAt: string; updatedAt?: string } | undefined>;
  protected readonly hasPanelImages: Signal<boolean>;
  private readonly article: Signal<ArticleMeta | undefined>;

  // Reading-time engagement tracking (see AnalyticsService.trackArticleReadingTime).
  // Plain fields, not signals: this is bookkeeping for a side effect, not
  // state the template reads.
  private trackedSlug: string | undefined;
  private currentArticle: ArticleMeta | undefined;
  private articleViewStartedAt = 0;
  private articleMaxScrollPercent = 0;
  private articleScrollThresholdsSent = new Set<number>();

  private readonly panelImageConfigs: Signal<readonly PanelImageConfig[]>;
  private panelImages: PanelImage[] = [];
  private processedPanelConfigs = new Set<PanelImageConfig>();
  private readonly panelMediaQuery = typeof window !== 'undefined' ? window.matchMedia('(min-width: 1150px)') : undefined;
  private relayoutScheduled = false;

  /** rAF-throttled: the page's own native scrollbar fires scroll
   * continuously (the cd header and the image pane are both `position:
   * sticky` rather than separate scroll containers now), and each relayout
   * does getBoundingClientRect reads, so this keeps it to one recalculation
   * per frame instead of one per scroll event. Scroll-depth tracking rides
   * along on the same throttle rather than adding a second rAF loop. */
  private readonly relayoutPanelImages = () => {
    if (this.relayoutScheduled) {
      return;
    }
    this.relayoutScheduled = true;
    requestAnimationFrame(() => {
      this.relayoutScheduled = false;
      this.applyPanelImageLayout();
      this.trackArticleScrollDepth();
    });
  };

  /** Reports 25/50/75/100% scroll-depth milestones, at most once each, for
   * whichever article is currently tracked. */
  private trackArticleScrollDepth(): void {
    if (!this.currentArticle || typeof document === 'undefined') {
      return;
    }
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - doc.clientHeight;
    const percent = scrollable > 0 ? Math.min(100, Math.round((window.scrollY / scrollable) * 100)) : 100;
    this.articleMaxScrollPercent = Math.max(this.articleMaxScrollPercent, percent);

    for (const threshold of SCROLL_DEPTH_THRESHOLDS) {
      if (percent >= threshold && !this.articleScrollThresholdsSent.has(threshold)) {
        this.articleScrollThresholdsSent.add(threshold);
        this.analytics.trackArticleScrollDepth(this.currentArticle, threshold);
      }
    }
  }

  /** Reports how long the current article was actually on screen for.
   * Called when the reader navigates to a different slug, away from the
   * article page entirely, or hides/closes the tab - see the constructor's
   * effect, ngOnDestroy, and the visibilitychange/pagehide listeners below.
   * Idempotent: articleViewStartedAt is zeroed after reporting, so a second
   * call (e.g. both visibilitychange and ngOnDestroy firing) is a no-op. */
  private finalizeArticleReadingTime(): void {
    if (!this.currentArticle || !this.articleViewStartedAt) {
      return;
    }
    const seconds = (Date.now() - this.articleViewStartedAt) / 1000;
    this.articleViewStartedAt = 0;
    // Skips near-instant bounces (e.g. a route change that immediately
    // redirects) rather than logging noise as a "read".
    if (seconds >= 1) {
      this.analytics.trackArticleReadingTime(this.currentArticle, seconds, this.articleMaxScrollPercent);
    }
  }

  /** Tab backgrounded/closed: finalize on hide (see above), and resume the
   * timer on return rather than starting a fresh view - a reader who tabs
   * away and back is still reading the same article. */
  private readonly handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      this.finalizeArticleReadingTime();
    } else if (this.currentArticle && !this.articleViewStartedAt) {
      this.articleViewStartedAt = Date.now();
    }
  };

  private readonly handlePageHide = () => this.finalizeArticleReadingTime();

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
        map((params) => articleBySlug[params.get('slug') ?? '']),
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

    this.postMeta = toSignal(
      this.route.paramMap.pipe(
        map((params) => {
          const slug = params.get('slug') ?? '';
          const post = articleBySlug[slug];
          const dates: { createdAt?: string; updatedAt?: string } = (postDates as Record<string, { createdAt?: string; updatedAt?: string }>)[slug] ?? {};
          return post && dates.createdAt ? { slug, createdAt: dates.createdAt, updatedAt: dates.updatedAt } : undefined;
        }),
      ),
      { initialValue: undefined },
    );

    this.article = toSignal(
      this.route.paramMap.pipe(map((params) => articleBySlug[params.get('slug') ?? ''])),
      { initialValue: undefined },
    );

    this.panelImageConfigs = toSignal(
      this.route.paramMap.pipe(map((params) => articleBySlug[params.get('slug') ?? '']?.panelImages ?? [])),
      { initialValue: [] },
    );
    this.hasPanelImages = toSignal(
      this.route.paramMap.pipe(map((params) => (articleBySlug[params.get('slug') ?? '']?.panelImages?.length ?? 0) > 0)),
      { initialValue: false },
    );

    // Sets the tab title per-article (the route table only has a generic
    // fallback - see app.routes.ts) and reports view/reading-time analytics
    // as the reader arrives at, and leaves, each article. Runs again on a
    // slug change even though this component instance is reused across
    // /articles/:slug navigations, so each article's title and events stay
    // correct without a full component teardown.
    effect(() => {
      const meta = this.article();
      this.titleService.setTitle(meta ? `${meta.title} | dewwwald` : 'Article not found | dewwwald');

      if (meta?.slug === this.trackedSlug) {
        return;
      }
      this.finalizeArticleReadingTime();
      this.trackedSlug = meta?.slug;
      this.currentArticle = meta;
      if (meta) {
        this.articleViewStartedAt = Date.now();
        this.articleMaxScrollPercent = 0;
        this.articleScrollThresholdsSent = new Set();
        this.analytics.trackArticleView(meta);
      }
    });

    afterRenderEffect(() => {
      if (this.postHtml()) {
        // A fresh postHtml means the article body was just replaced wholesale,
        // so any element references tracked from before are gone with it.
        this.panelImages = [];
        this.processedPanelConfigs = new Set();
        void this.renderMermaidDiagrams().then(() => this.setupPanelImages());
      }
    });

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.relayoutPanelImages, { passive: true });
      window.addEventListener('resize', this.relayoutPanelImages);
      window.addEventListener('pagehide', this.handlePageHide);
      document.addEventListener('visibilitychange', this.handleVisibilityChange);
      this.panelMediaQuery?.addEventListener('change', this.relayoutPanelImages);
    }
  }

  ngOnDestroy(): void {
    this.finalizeArticleReadingTime();
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.relayoutPanelImages);
      window.removeEventListener('resize', this.relayoutPanelImages);
      window.removeEventListener('pagehide', this.handlePageHide);
      document.removeEventListener('visibilitychange', this.handleVisibilityChange);
      this.panelMediaQuery?.removeEventListener('change', this.relayoutPanelImages);
    }
  }

  /** Locates (or creates) each configured panel image once and hands off to
   * layout, which decides per current breakpoint whether it lives in the
   * pane or inline in the article. */
  private setupPanelImages(): void {
    const container = this.articleBody?.nativeElement;
    if (!container) {
      return;
    }

    for (const config of this.panelImageConfigs()) {
      if (this.processedPanelConfigs.has(config)) {
        continue;
      }

      if (config.kind === 'quote') {
        const anchor = config.anchorText && this.findParagraphContaining(container, config.anchorText);
        if (!anchor) {
          continue;
        }
        const el = document.createElement('blockquote');
        el.className = 'pull-quote';
        el.textContent = config.text ?? '';
        // Same idea as a screenshot: no spot of its own in the markdown,
        // so it gets one - right before the paragraph it's pulled from,
        // which is also exactly where it belongs inline on mobile.
        const placeholder = document.createComment(`panel-image: quote "${config.anchorText}"`);
        anchor.before(placeholder);
        this.panelLayer?.nativeElement.appendChild(el);
        this.panelImages.push({ heading: anchor, el, placeholder });
        this.processedPanelConfigs.add(config);
        continue;
      }

      const heading = config.headingText && this.findHeadingByText(container, config.headingText);
      if (!heading) {
        continue;
      }

      if (config.kind === 'diagram') {
        const el = this.findDiagramAfterHeading(heading);
        if (!el) {
          continue;
        }
        const placeholder = document.createComment(`panel-image: ${config.headingText}`);
        el.before(placeholder);
        this.panelLayer?.nativeElement.appendChild(el);
        this.panelImages.push({ heading, el, placeholder });
      } else {
        const img = document.createElement('img');
        img.className = 'floating-screenshot';
        img.alt = '';
        img.src = config.src ?? '';
        // No natural spot of its own in the markdown (unlike a diagram),
        // so give it one: right after the heading it tracks, same as where
        // a reader would expect an illustration for that section to sit.
        const placeholder = document.createComment(`panel-image: ${config.headingText}`);
        heading.after(placeholder);
        this.panelLayer?.nativeElement.appendChild(img);
        this.panelImages.push({ heading, el: img, placeholder });
      }
      this.processedPanelConfigs.add(config);
    }

    this.applyPanelImageLayout();
  }

  /** Desktop (pane visible): every image stays in the DOM permanently, as a
   * permanent child of the pane - nothing is ever removed or re-parented.
   * Only the "active" one (see below) gets floored at the pane's top edge
   * and capped against the next image's own top edge. Every other image is
   * simply left at its own live heading position, uncapped - which, by
   * construction, is already off in the distance (large and positive) for
   * ones that haven't had their turn yet, or has already scrolled up past
   * the pane's top edge (negative, clipped out of view by the pane's own
   * overflow) for ones whose turn already passed. That's what makes it
   * reversible for free: recomputed fresh from current scroll position
   * every call, nothing persists between frames to get stuck.
   * Below the breakpoint there's no pane, so no grabbing and no scroll
   * tracking either: every image (screenshot or diagram) just sits inline
   * in the article's own flow, at its placeholder. */
  private applyPanelImageLayout(): void {
    const layer = this.panelLayer?.nativeElement;
    const isDesktop = this.panelMediaQuery?.matches ?? false;

    if (!isDesktop || !layer) {
      for (const image of this.panelImages) {
        if (image.placeholder && image.el.parentElement !== image.placeholder.parentElement) {
          image.placeholder.parentElement?.insertBefore(image.el, image.placeholder);
          image.el.style.top = '';
        }
      }
      return;
    }

    const layerTop = layer.getBoundingClientRect().top;
    const rawTop = (image: PanelImage) => image.heading.getBoundingClientRect().top - layerTop;

    // Which image is "active" is a pure function of the current scroll
    // position - image[i+1] takes over the instant its own heading reaches
    // the pane's top edge, and hands back the instant it doesn't anymore.
    let activeIndex = 0;
    while (activeIndex < this.panelImages.length - 1 && rawTop(this.panelImages[activeIndex + 1]) <= 0) {
      activeIndex++;
    }

    for (const [i, image] of this.panelImages.entries()) {
      if (i === activeIndex) {
        continue;
      }
      if (image.el.parentElement !== layer) {
        layer.appendChild(image.el);
      }
      image.el.style.top = `${rawTop(image)}px`;
    }

    const active = this.panelImages[activeIndex];
    const next = this.panelImages[activeIndex + 1];
    if (active.el.parentElement !== layer) {
      layer.appendChild(active.el);
    }

    // Rests at the pane's top edge by default. But if it's tall enough (or
    // next is close enough) that resting there would overlap the next
    // image, that takes priority: it scrolls up past 0 - revealing more of
    // itself, never overlapping - however far it takes to keep clear.
    let top = Math.max(rawTop(active), 0);
    if (next) {
      top = Math.min(top, rawTop(next) - active.el.getBoundingClientRect().height);
    }
    active.el.style.top = `${top}px`;
  }

  private findHeadingByText(container: HTMLElement, text: string): HTMLElement | undefined {
    return Array.from(container.querySelectorAll<HTMLElement>('h1, h2, h3')).find(
      (h) => h.textContent?.trim() === text,
    );
  }

  private findParagraphContaining(container: HTMLElement, text: string): HTMLElement | undefined {
    return Array.from(container.querySelectorAll<HTMLElement>('p')).find((p) => p.textContent?.includes(text));
  }

  /** Walks forward from the heading, stopping at the next heading, looking
   * for the mermaid diagram that belongs to this section. */
  private findDiagramAfterHeading(heading: HTMLElement): HTMLElement | undefined {
    let node = heading.nextElementSibling;
    while (node && !/^H[1-3]$/.test(node.tagName)) {
      if (node.classList.contains('mermaid-diagram')) {
        return node as HTMLElement;
      }
      node = node.nextElementSibling;
    }
    return undefined;
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
