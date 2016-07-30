import { Injectable } from '@angular/core';

@Injectable()

export class SidebarService {
  getLogoUrl() {
    return '/assets/img/web-engineer-dewwwald-02.svg';
  }

  getNavItems() {
    return [
      'Who',
      'Why',
      'What',
      'Where',
      'When'
    ];
  }
}
