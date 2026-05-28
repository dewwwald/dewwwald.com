import { NgFor } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { navItems } from '../data/nav';
import { FullPageDirective } from '../directives/full-page.directive';

@Component({
  selector: 'dewwwald-sidebar',
  standalone: true,
  imports: [FullPageDirective, NgFor, RouterLink, RouterLinkActive],
  template: `
    <button class="menu-toggler" type="button" aria-label="Toggle navigation" (click)="toggleNav()">
      <span class="toggle__icon" aria-hidden="true">
        <svg viewBox="0 0 512 512">
          <path id="burger-bar-one" class="burger-path" d="M50,116.7l412,1c0,0,82.4,0.3,138.4-1.7s90.8-85,79.8-116s-45.5-53.2-142,0C462,42,404.7,107,404.7,107L108.5,402.2" />
          <path id="burger-bar-two" class="burger-path" d="M462,384.2l-419.2,0c0,0-126.5,2.5-89.8,103.2c12.3,33.8,84,58.5,138,64.5c32.7,3.6,226,24.6,321.5-30.3c80-46-22-127.4-22-127.4L108.4,109.6" />
          <line id="burger-bar-three" class="burger-path" x1="50" y1="256" x2="462" y2="256" />
        </svg>
      </span>
    </button>
    <nav dewwwaldFullPage class="menu--primary-container" (mouseleave)="closeNav()">
      <a class="logo" routerLink="/who" (click)="closeNav()">
        <img src="/assets/img/web-engineer-dewwwald-02.svg" alt="Dewald Laubscher">
      </a>
      <ul class="menu--primary">
        <li routerLinkActive="menu__item--current" class="menu__item" *ngFor="let navItem of navItems">
          <a
            [routerLink]="navItem.link"
            [fragment]="navItem.fragment"
            (click)="navigationClick()"
            (mouseover)="openNav()"
          >
            <span class="menu__item-text">{{ navItem.title }}</span>
          </a>
        </li>
      </ul>
      <div class="social">
        <a class="social__link" target="_blank" rel="noopener noreferrer" href="https://za.linkedin.com/in/dewaldlaubscher" aria-label="LinkedIn">
          <svg class="social__icon" viewBox="0 0 512 512" aria-hidden="true">
            <path d="M256,0C114.6,0,0,114.6,0,256c0,141.4,114.6,256,256,256c141.4,0,256-114.6,256-256C512,114.6,397.4,0,256,0z M180.9,377.9h-52.3V212.3h52.3V377.9z M153.5,191.6h-0.4c-18.9,0-31.2-12.7-31.2-28.7c0-16.3,12.6-28.8,31.9-28.8s31.2,12.4,31.5,28.8C185.4,178.9,173.1,191.6,153.5,191.6z M390.1,377.9h-59.3v-85.8c0-22.4-9.3-37.7-29.7-37.7c-15.6,0-24.2,10.4-28.3,20.3c-1.5,3.6-1.3,8.6-1.3,13.5v89.6h-58.7c0,0,0.8-151.8,0-165.6h58.7v26c3.5-11.3,22.2-27.6,52.2-27.6c37.1,0,66.3,23.8,66.3,75.1V377.9z" />
          </svg>
        </a>
        <a class="social__link" target="_blank" rel="noopener noreferrer" href="http://github.com/dewwwald" aria-label="GitHub">
          <svg class="social__icon" viewBox="0 0 512 512" aria-hidden="true">
            <path d="M256 5.3C114.6 5.3 0 120.4 0 262.4c0 113.5 73.3 209.9 175.1 243.9 12.8 2.3 17.5-5.6 17.5-12.4 0-6.1-.2-26.4-.4-47.9-71.2 15.6-86.3-30.7-86.3-30.7-11.6-29.6-28.4-37.5-28.4-37.5-23.3-15.9 1.8-15.6 1.8-15.6 25.7 1.8 39.2 26.5 39.2 26.5 22.8 39.3 59.9 27.9 74.5 21.3 2.3-16.7 8.9-27.9 16.3-34.3-56.8-6.5-116.6-28.5-116.6-127 0-28.1 10-51 26.3-69-2.6-6.5-11.4-32.6 2.5-68 0 0 21.5-6.9 70.4 26.3 20.4-5.7 42.3-8.6 64.1-8.7 21.7.1 43.7 3 64.1 8.7 48.9-33.2 70.3-26.3 70.3-26.3 14 35.3 5.2 61.5 2.6 68 16.4 18 26.3 40.9 26.3 69 0 98.7-59.9 120.4-116.9 126.8 9.2 7.9 17.4 23.6 17.4 47.5 0 34.4-.3 62.1-.3 70.5 0 6.9 4.6 14.9 17.6 12.3C438.8 472 512 375.7 512 262.4 512 120.4 397.4 5.3 256 5.3z" />
          </svg>
        </a>
      </div>
    </nav>
  `,
})
export class SidebarComponent {
  protected readonly navItems = navItems;

  @HostBinding('class.sidebar--in')
  protected navToggled = false;

  protected toggleNav(): void {
    this.navToggled = !this.navToggled;
  }

  protected openNav(): void {
    this.navToggled = true;
  }

  protected closeNav(): void {
    this.navToggled = false;
  }

  protected navigationClick(): void {
    window.setTimeout(() => this.closeNav(), 250);
  }
}
