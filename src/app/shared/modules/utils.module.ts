import { NgModule } from '@angular/core';
import { FullPageDirective } from '../../shared/directives/full-page.directive';
import { SvgIconComponent } from '../../shared/svg-icon-system/svg-icon-system.component';
import { SvgIconsSystemService } from '../../shared/services/svg-icon-system.service';

@NgModule({
  declarations: [
    FullPageDirective,
    SvgIconComponent,
  ],
  providers: [
    SvgIconsSystemService,
  ],
  exports: [
    FullPageDirective,
    SvgIconComponent,
  ]
})
export class UtilsModule {}
