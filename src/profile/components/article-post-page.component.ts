import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnDestroy,
  Signal,
  ViewChild,
  afterRenderEffect,
  inject,
  isDevMode,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, map, of, switchMap } from 'rxjs';
import { marked } from 'marked';
import mermaid from 'mermaid';

// Generated at build/serve time from git history (see
// scripts/generate-post-meta.mjs and package.json's pre* hooks) - never
// hand-maintained, so it can't go stale.
import postDates from '../../generated/post-dates.json';

interface PanelImageConfig {
  readonly kind: 'screenshot' | 'diagram' | 'quote';
  /** Required for 'screenshot'/'diagram': exact text of the h1/h2/h3 this
   * image tracks. For a 'diagram', the first ```mermaid block after that
   * heading (and before the next one) is pulled out of the article and
   * placed here instead of rendering inline. For a 'screenshot', `src` is
   * shown - nothing is moved out of the article. */
  readonly headingText?: string;
  readonly src?: string;
  /** Required for 'quote': a substring that identifies the paragraph to
   * pull the quote from - it tracks that paragraph on desktop, and on
   * mobile the quote is inserted inline right before it. */
  readonly anchorText?: string;
  /** Required for 'quote': the pull-quote text itself. */
  readonly text?: string;
}

interface ArticlePostConfig {
  readonly title: string;
  readonly path: string;
  /** Images (and pull-quotes) shown one at a time in the pane next to the
   * article, in the order they should hand off (earliest section first).
   * Only the active one tracks its anchor as you scroll; it freezes the
   * instant it would reach the next one, then exits once scrolling carries
   * the next one's own anchor to the top of the pane - see
   * `applyPanelImageLayout`. Nothing here moves on a timer. */
  readonly panelImages?: readonly PanelImageConfig[];
}

const posts: Record<string, ArticlePostConfig> = {
  'prompt-injection-fake-hacker-site': {
    title: 'Hiding an Attack Inside a Webpage, Then Asking My AI to Read It',
    path: 'assets/posts/prompt-injection-fake-hacker-site.md',
  },
  'how-to-guide-your-llm-to-communicate-with-your-system': {
    title: 'How to guide your LLM to communicate with your system',
    path: 'assets/posts/how-to-guide-your-llm-to-communicate-with-your-system.md',
    panelImages: [
      {
        kind: 'screenshot',
        headingText: 'How to guide your LLM to communicate with your system',
        src: 'assets/img/directed-decoding-demo-screenshot-1.png',
      },
      { kind: 'diagram', headingText: 'The first draft' },
      {
        kind: 'screenshot',
        headingText: 'Attempt two: actually constraining the model',
        src: 'assets/img/directed-decoding-demo.gif',
      },
      {
        kind: 'quote',
        anchorText: 'a schema constrains shape, not intent',
        text: 'As far as an LLM is concerned, a schema constrains shape, not intent. Inference does not guard against real data labels, it gives the most likely.',
      },
    ],
  },
};

/** Drafts: real files, kept in version control, pointed at
 * assets/draft-posts - a folder the production build excludes entirely
 * (see angular.json's `ignore` on that asset glob), so the markdown itself
 * never ships. `isDevMode()` below keeps the route table's title/metadata
 * out of the production bundle too. Only reachable locally, by URL - not
 * listed on the /articles page. */
const draftPosts: Record<string, ArticlePostConfig> = {
  'vector-database-the-need-to-know-guide': {
    title: 'Vector Database: The Need-to-Know Guide',
    path: 'assets/draft-posts/vector-database-the-need-to-know-guide.md',
  },
};

if (isDevMode()) {
  Object.assign(posts, draftPosts);
}

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

  @ViewChild('articleBody') private articleBody?: ElementRef<HTMLElement>;
  @ViewChild('panelLayer') private panelLayer?: ElementRef<HTMLElement>;

  protected readonly postHtml: Signal<SafeHtml | undefined>;
  protected readonly postMeta: Signal<{ slug: string; createdAt: string; updatedAt?: string } | undefined>;
  protected readonly hasPanelImages: Signal<boolean>;

  private readonly panelImageConfigs: Signal<readonly PanelImageConfig[]>;
  private panelImages: PanelImage[] = [];
  private processedPanelConfigs = new Set<PanelImageConfig>();
  private readonly panelMediaQuery = typeof window !== 'undefined' ? window.matchMedia('(min-width: 1150px)') : undefined;
  private relayoutScheduled = false;

  /** rAF-throttled: the page's own native scrollbar fires scroll
   * continuously (the cd header and the image pane are both `position:
   * sticky` rather than separate scroll containers now), and each relayout
   * does getBoundingClientRect reads, so this keeps it to one recalculation
   * per frame instead of one per scroll event. */
  private readonly relayoutPanelImages = () => {
    if (this.relayoutScheduled) {
      return;
    }
    this.relayoutScheduled = true;
    requestAnimationFrame(() => {
      this.relayoutScheduled = false;
      this.applyPanelImageLayout();
    });
  };

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

    this.postMeta = toSignal(
      this.route.paramMap.pipe(
        map((params) => {
          const slug = params.get('slug') ?? '';
          const post = posts[slug];
          const dates: { createdAt?: string; updatedAt?: string } = (postDates as Record<string, { createdAt?: string; updatedAt?: string }>)[slug] ?? {};
          return post && dates.createdAt ? { slug, createdAt: dates.createdAt, updatedAt: dates.updatedAt } : undefined;
        }),
      ),
      { initialValue: undefined },
    );

    this.panelImageConfigs = toSignal(
      this.route.paramMap.pipe(map((params) => posts[params.get('slug') ?? '']?.panelImages ?? [])),
      { initialValue: [] },
    );
    this.hasPanelImages = toSignal(
      this.route.paramMap.pipe(map((params) => (posts[params.get('slug') ?? '']?.panelImages?.length ?? 0) > 0)),
      { initialValue: false },
    );

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
      this.panelMediaQuery?.addEventListener('change', this.relayoutPanelImages);
    }
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.relayoutPanelImages);
      window.removeEventListener('resize', this.relayoutPanelImages);
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
