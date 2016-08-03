import { Injectable } from '@angular/core';

@Injectable()

export class SidebarService {
  getLogoUrl() {
    return '/assets/img/web-engineer-dewwwald-02.svg';
  }

  getNavItems() {
    return [
      {title: 'Who', link: '/who'},
      {title: 'What', link: '/what'},
      {title: 'Why', link: '/why'},
      {title: 'When', link: '/when'},
      {title: 'Where', link: '/where'}
    ];
  }
}
