import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';

import { UtilsModule } from '../../shared/modules/utils.module';

import { AspectsDirective } from '../../shared/directives/aspects.directive';
import { AspectsService } from '../../shared/services/aspects.service';

@NgModule({
  imports: [
    UtilsModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    AspectsDirective,
  ],
  providers: [
    AspectsService,
  ]
})
export class HomeModule { }
