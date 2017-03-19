import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { CommonModule } from '@angular/common';
import { UtilsModule } from '../../shared/modules/utils.module';

import { WhatComponent } from './what.component';
import { WhatRoutingModule } from './what.routing';
import { WhatService } from './what.service';

import { HalfPageDirective } from '../../shared/directives/half-page.directive';
import { SlideHoverDirective } from '../../shared/directives/slide-hover.directive';
import { ImageCoverDirective } from '../../shared/directives/image-cover.directive';
import { BgcModifierDirective } from '../../shared/directives/bgc-modifier.directive';

@NgModule({
  imports:      [
    WhatRoutingModule,
    CommonModule,
    WhatRoutingModule,
    UtilsModule,
  ],
  declarations: [
    WhatComponent,
    HalfPageDirective,
    SlideHoverDirective,
    ImageCoverDirective,
    BgcModifierDirective,
  ],
  providers: [
    WhatService,
  ],
})
export class WhatModule { }
