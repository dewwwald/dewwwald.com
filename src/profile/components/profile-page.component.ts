import { AfterViewInit, Component, HostListener } from '@angular/core';

import { ArticlesComponent } from './articles.component';
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
  imports: [ArticlesComponent, HomeComponent, WhyComponent, WhenWhereComponent],
  template: `
    <section id="who" data-path="/who">
      <dewwwald-home />
    </section>
    <section id="what" data-path="/what">
      <dewwwald-articles />
    </section>
    <section id="why" data-path="/why">
      <dewwwald-why />
    </section>
    <section id="when-where" data-path="/when-where">
      <dewwwald-when-where />
    </section>
  `,
})
export class ProfilePageComponent implements AfterViewInit {
  private readonly sections: readonly ScrollSection[] = [
    { id: 'who', path: '/who' },
    { id: 'what', path: '/what' },
    { id: 'why', path: '/why' },
    { id: 'when-where', path: '/when-where' },
  ];
  private currentPath = '';

  ngAfterViewInit(): void {
    window.requestAnimationFrame(() => {
      this.scrollToCurrentRoute();
      this.updatePathForScroll();
    });
  }

  @HostListener('window:scroll')
  protected updatePathForScroll(): void {
    const current = this.sections
      .map((section) => ({
        ...section,
        top: document.getElementById(section.id)?.offsetTop ?? 0,
      }))
      .filter((section) => window.scrollY + 140 >= section.top)
      .at(-1);

    if (current && current.path !== this.currentPath) {
      this.currentPath = current.path;
      window.history.replaceState(window.history.state, '', current.path);
    }
  }

  private scrollToCurrentRoute(): void {
    const section = this.sections.find((item) => item.path === window.location.pathname) ?? this.sections[0];
    const fragment = window.location.hash.replace('#', '');
    const target = fragment ? document.getElementById(fragment) : document.getElementById(section.id);
    target?.scrollIntoView({ block: 'start' });
    this.currentPath = section.path;
    window.history.replaceState(window.history.state, '', `${section.path}${window.location.hash}`);
  }
}
