import { NgModule } from '@angular/core';

import { ScrollNavigationAnimationService } from './scroll-navigation-animation.service';
import { ScrollNavigationService } from './scroll-navigation.service';
import { ScrollNavigationDirective } from './scroll-navigation.directive';

@NgModule({
  declarations: [
    ScrollNavigationDirective
  ],
  providers: [
    ScrollNavigationAnimationService,
    ScrollNavigationService,
  ],
  exports: [
    ScrollNavigationDirective
  ]
})
export class ScrollNavigationModule {}
