import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

import { NavItem, navItems } from '../data/nav';

@Component({
  selector: 'dewwwald-site-footer',
  standalone: true,
  imports: [NgFor],
  template: `
    <footer class="site-footer">
      <a class="site-footer__logo" href="/about" aria-label="Dewald Laubscher home">
        <img src="/assets/img/web-engineer-dewwwald-02.svg" alt="Dewald Laubscher">
      </a>

      <nav class="site-footer__nav" aria-label="Profile sections">
        <a
          *ngFor="let navItem of navItems"
          [href]="navItem.href"
          (click)="navigateToSection($event, navItem.href)"
        >
          {{ navItem.title }}
        </a>
      </nav>

      <div class="site-footer__meta">
        <a href="/resume/technical">Technical resume</a>
        <a href="/resume/engineering-manager">Manager resume</a>
        <a href="mailto:laubscher.dewald@gmail.com?subject=Staff%20engineering%20conversation">Email</a>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/dewwwald">GitHub</a>
        <a target="_blank" rel="noopener noreferrer" href="https://za.linkedin.com/in/dewaldlaubscher">LinkedIn</a>
      </div>
    </footer>
  `,
})
export class SiteFooterComponent {
  protected readonly navItems: readonly NavItem[] = navItems;
  private activeAnimation: number | undefined;
  private previousScrollBehavior = '';

  protected navigateToSection(event: MouseEvent, href: string): void {
    const targetId = href.split('#')[1];

    if (!targetId) {
      return;
    }

    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();
    this.scrollFromCurrentPosition(target, href);
  }

  private scrollFromCurrentPosition(target: HTMLElement, href: string): void {
    if (this.activeAnimation !== undefined) {
      window.cancelAnimationFrame(this.activeAnimation);
      this.restoreScrollBehavior();
    }

    const start = window.scrollY;
    const end = target.offsetTop;
    const distance = end - start;
    const duration = Math.min(900, Math.max(320, Math.abs(distance) * 0.34));
    const startedAt = window.performance.now();
    const html = document.documentElement;

    this.previousScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';

    const tick = (now: number): void => {
      const elapsed = now - startedAt;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);

      window.scrollTo(0, start + distance * eased);

      if (progress < 1) {
        this.activeAnimation = window.requestAnimationFrame(tick);
        return;
      }

      this.activeAnimation = undefined;
      this.restoreScrollBehavior();
      window.history.pushState(window.history.state, '', href);
    };

    this.activeAnimation = window.requestAnimationFrame(tick);
  }

  private restoreScrollBehavior(): void {
    document.documentElement.style.scrollBehavior = this.previousScrollBehavior;
    this.previousScrollBehavior = '';
  }
}
