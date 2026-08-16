import { Component, DestroyRef, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

import { SiteFooterComponent } from './components/site-footer.component';
import { AnalyticsService } from './services/analytics.service';

@Component({
  selector: 'dewwwald-root',
  standalone: true,
  imports: [RouterOutlet, SiteFooterComponent],
  template: `
    <div class="site-shell">
      <router-outlet />
      <dewwwald-site-footer />
    </div>
  `,
})
export class AppComponent {
  constructor() {
    const router = inject(Router);
    const analytics = inject(AnalyticsService);
    const destroyRef = inject(DestroyRef);

    const subscription = router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        // Angular sets document.title (the route's static title, or the
        // per-article title article-post-page.component.ts sets itself)
        // while activating the route - same tick as this event, but not
        // guaranteed before it, so wait a macrotask for it to settle
        // before reading it back for GA.
        setTimeout(() => analytics.trackPageView(event.urlAfterRedirects, document.title));
      });

    destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
