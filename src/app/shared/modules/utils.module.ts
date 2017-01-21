import { NgModule } from '@angular/core';
import { FullPageDirective } from '../../shared/directives/full-page.directive';

@NgModule({
  declarations: [
    FullPageDirective,
  ],
  exports: [
    FullPageDirective,
  ]
})
export class UtilsModule {}
