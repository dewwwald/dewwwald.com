import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule }    from '@angular/http';

import { Ng2PageScrollModule, PageScrollService } from 'ng2-page-scroll';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { WhenComponent } from './when.component';
import { WhenRoutingModule } from './when.routing';

import { FormContactComponent } from '../../shared/form-content/form-content.component';
import { UtilsModule } from '../../shared/modules/utils.module';

@NgModule({
  imports:      [
    Ng2PageScrollModule,
    WhenRoutingModule,
    FormsModule,
    CommonModule,
    HttpModule,
    UtilsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDsbCn79qvF5YoevoJJ3ix2zaNmId4DvNI'
    }),
  ],
  declarations: [
    WhenComponent,
    FormContactComponent,
  ],
  providers: [
    PageScrollService,
    AgmCoreModule,
  ],
})
export class WhenModule { }
