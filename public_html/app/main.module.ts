import { NgModule }      from '@angular/core';
import { RouterModule }   from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { LayoutComponent } from './components/layout/layout.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { MainContentComponent } from './shared/main-content/main-content.component';
import { HomeComponent } from './components/home/home.component';
import { WhyComponent } from './components/why/why.component';
import { WhatComponent } from './components/what/what.component';
import { WhenComponent } from './components/when/when.component';
import { FormContactComponent } from './shared/form-content/form-content.component';

import { routes } from './config/app.routes';

import { FullHeightDirective } from './shared/directives/full-height.directive';
import { FullPageDirective } from './shared/directives/full-page.directive';
import { SvgIconDirective } from './shared/directives/svg-icon-system.directive';
import { HalfPageDirective } from './shared/directives/half-page.directive';
import { BgcModifierDirective } from './shared/directives/bgc-modifier.directive';
import { SlideHoverDirective } from './shared/directives/slide-hover.directive';
import { ImageCoverDirective } from './shared/directives/image-cover.directive';
import { SinceDirective } from './shared/directives/since.directive';
import { BarChartDirective } from './shared/directives/chart.directive';
import { AspectsDirective } from './shared/main-content/main-content.directive';
import { AppMenuDirective } from './shared/sidebar/middle-sidebar.directive';

@NgModule({
  imports:      [
    BrowserModule,
    Ng2PageScrollModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDsbCn79qvF5YoevoJJ3ix2zaNmId4DvNI'
    }),
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
  ],
  declarations: [
    LayoutComponent,
    SidebarComponent,
    MainContentComponent,
    HomeComponent,
    WhyComponent,
    WhatComponent,
    WhenComponent,
    AppMenuDirective,
    FormContactComponent,
    FullHeightDirective,
    FullPageDirective,
    SvgIconDirective,
    HalfPageDirective,
    BgcModifierDirective,
    SlideHoverDirective,
    ImageCoverDirective,
    SinceDirective,
    AspectsDirective,
    BarChartDirective,
  ],
  exports:      [ LayoutComponent ],
  bootstrap:    [ LayoutComponent ]
})
export class MainModule { }
