import { AfterViewInit, Component, HostListener } from '@angular/core';

import { HomeComponent } from './home.component';
import { WhyComponent } from './why.component';
import { WhenWhereComponent } from './when-where.component';

interface ScrollSection {
  readonly id: string;
  readonly path: string;
}

@Component({
  selector: 'dewwwald-profile-page',
  standalone: true,
  imports: [HomeComponent, WhyComponent, WhenWhereComponent],
  template: `
    <section id="about" data-path="/about">
      <dewwwald-home />
    </section>
    <section id="experience" data-path="/experience">
      <dewwwald-why />
    </section>
    <section id="contact" data-path="/contact">
      <dewwwald-when-where />
    </section>
  `,
})
export class ProfilePageComponent implements AfterViewInit {
  private readonly sections: readonly ScrollSection[] = [
    { id: 'about', path: '/about' },
    { id: 'experience', path: '/experience' },
    { id: 'contact', path: '/contact' },
  ];
  private currentNavKey = '';
  private routeScrollSettled = false;

  ngAfterViewInit(): void {
    window.requestAnimationFrame(() => {
      this.scrollToCurrentRoute();
      window.setTimeout(() => {
        this.routeScrollSettled = true;
      }, 120);
    });
  }

  @HostListener('window:scroll')
  protected updatePathForScroll(): void {
    if (!this.routeScrollSettled) {
      return;
    }

    const current = this.sections
      .map((section) => ({
        ...section,
        top: document.getElementById(section.id)?.offsetTop ?? 0,
      }))
      .filter((section) => window.scrollY + 140 >= section.top)
      .at(-1);

    if (current) {
      this.setCurrentSection(current);
    }
  }

  private scrollToCurrentRoute(): void {
    const fragment = window.location.hash.replace('#', '');
    const section =
      this.sections.find((item) => item.id === fragment) ??
      this.sections.find((item) => item.path === window.location.pathname) ??
      this.sections[0];
    const target = document.getElementById(section.id);

    if (target) {
      window.scrollTo({ top: target.offsetTop, left: 0, behavior: 'auto' });
    }

    this.setCurrentSection(section);
  }

  private setCurrentSection(section: ScrollSection): void {
    const navKey = this.navKeyFor(section);

    if (navKey === this.currentNavKey) {
      return;
    }

    this.currentNavKey = navKey;
    window.history.replaceState(window.history.state, '', navKey);
    window.dispatchEvent(
      new CustomEvent('dewwwald-section-change', {
        detail: { id: section.id, path: section.path, navKey },
      }),
    );
  }

  private navKeyFor(section: ScrollSection): string {
    return section.path;
  }
}
