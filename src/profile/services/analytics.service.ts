import { Injectable } from '@angular/core';

import { ArticleMeta } from '../data/articles';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Thin wrapper around the gtag.js loader in index.html - centralizes every
 * GA4 event this site sends so names/params stay consistent, and keeps the
 * `window.gtag` guard in one place (it loads async, so it isn't always
 * there yet, and there's no window at all outside the browser). */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private send(name: string, params: Record<string, unknown> = {}): void {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
      return;
    }
    window.gtag('event', name, params);
  }

  /** Fired on every Angular route change (see AppComponent). gtag.js's own
   * automatic pageview only fires once, on the initial hard load - index.html
   * turns it off (`send_page_view: false`) so this is the only source of
   * page_view events, since otherwise every in-app navigation on this SPA
   * (which is all of them) would be invisible to GA. */
  trackPageView(pagePath: string, pageTitle: string): void {
    this.send('page_view', {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: pageTitle,
    });
  }

  trackArticleView(article: ArticleMeta): void {
    this.send('article_view', {
      article_slug: article.slug,
      article_title: article.title,
      article_status: article.status,
    });
  }

  trackArticleScrollDepth(article: ArticleMeta, percent: number): void {
    this.send('article_scroll_depth', {
      article_slug: article.slug,
      article_title: article.title,
      percent_scrolled: percent,
    });
  }

  /** Fired once, when a reader leaves an article - route change away, tab
   * hidden, or tab/window closed (see article-post-page.component.ts) -
   * since that's the only point actual time-spent-reading is known. */
  trackArticleReadingTime(article: ArticleMeta, seconds: number, maxScrollPercent: number): void {
    this.send('article_reading_time', {
      article_slug: article.slug,
      article_title: article.title,
      engagement_time_msec: Math.round(seconds * 1000),
      reading_time_seconds: Math.round(seconds),
      max_scroll_percent: maxScrollPercent,
    });
  }
}
