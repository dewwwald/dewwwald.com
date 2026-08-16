import { isDevMode } from '@angular/core';

export type ArticleStatus = 'published' | 'draft';

export interface PanelImageConfig {
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

export interface ArticleMeta {
  readonly slug: string;
  readonly title: string;
  /** Shown on the /articles listing. Drafts never reach that listing, so
   * it's optional for them. */
  readonly summary?: string;
  readonly path: string;
  readonly status: ArticleStatus;
  readonly panelImages?: readonly PanelImageConfig[];
}

/** The single source of truth for every article - what /articles lists,
 * what article-post-page.component.ts loads and titles each post page
 * with, and what the analytics events (see AnalyticsService) describe it
 * as. Newest first: the homepage's "Writing" teaser pulls the first two
 * published ones, and /articles lists all published ones in this order. */
const allArticles: readonly ArticleMeta[] = [
  {
    slug: 'how-to-guide-your-llm-to-communicate-with-your-system',
    title: 'How to guide your LLM to communicate with your system',
    summary:
      'A local model turned natural language into a structured query in an hour, and that was only half the problem. The rest was making its output something an enterprise system could actually trust.',
    path: 'assets/posts/how-to-guide-your-llm-to-communicate-with-your-system.md',
    status: 'published',
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
  {
    slug: 'prompt-injection-fake-hacker-site',
    title: 'Hiding an Attack Inside a Webpage, Then Asking My AI to Read It',
    summary:
      'I built a fake hacker site with hidden prompt-injection payloads and pointed my local AI’s web-search tool at it, to see whether it would act on instructions buried in fetched content.',
    path: 'assets/posts/prompt-injection-fake-hacker-site.md',
    status: 'published',
  },
  // A real file, kept in version control, pointed at assets/draft-posts - a
  // folder the production build excludes entirely (see angular.json's
  // `ignore` on that asset glob), so the markdown itself never ships.
  // status: 'draft' keeps it off the /articles listing always, and the
  // isDevMode() gate below keeps it out of articleBySlug (and therefore
  // unreachable even by direct URL) in production too.
  {
    slug: 'vector-database-the-need-to-know-guide',
    title: 'Vector Database: The Need-to-Know Guide',
    path: 'assets/draft-posts/vector-database-the-need-to-know-guide.md',
    status: 'draft',
  },
];

const publishedArticles = allArticles.filter((article) => article.status === 'published');

/** /articles listing + the homepage "Writing" teaser: published only, in
 * source order (newest first). */
export const articles: readonly ArticleMeta[] = publishedArticles;

const lookupArticles = isDevMode() ? allArticles : publishedArticles;

/** O(1) lookup for article-post-page.component.ts, keyed by slug. Excludes
 * drafts in production. */
export const articleBySlug: Readonly<Record<string, ArticleMeta>> = Object.fromEntries(
  lookupArticles.map((article) => [article.slug, article]),
);
