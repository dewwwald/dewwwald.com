import { Injectable } from '@angular/core';
@Injectable()
export class ScrollNavigationService {
  private _href;

  public get href(): string {
    return this._href;
  }

  public set href(href: string) {
    this._href = href;
  }

  constructor() {}

  setupFirstOccurance(attempHref) {
    if (!this.href) {
      this.href = attempHref;
    }
  }
}
