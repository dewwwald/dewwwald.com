import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';

import { Ng2PageScrollModule, PageScrollService } from 'ng2-page-scroll';

import { LayoutComponent } from './components/layout/layout.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

import { routes } from './config/app.routes';

import { UtilsModule } from './shared/modules/utils.module';
import { SvgIconComponent } from './shared/svg-icon-system/svg-icon-system.component';
import { SvgIconsSystemService } from './shared/services/svg-icon-system.service';

import { SidebarService } from './shared/sidebar/sidebar.service';
import { WindowService } from './shared/services/window.service';
import { DocumentService } from './shared/services/document.service';

@NgModule({
  imports:      [
    BrowserModule,
    Ng2PageScrollModule,
    UtilsModule,
    RouterModule.forRoot(routes),
    HttpModule,
  ],
  declarations: [
    LayoutComponent,
    SidebarComponent,
    SvgIconComponent,
  ],
  providers: [
    SidebarService,
    WindowService,
    DocumentService,
    PageScrollService,
    SvgIconsSystemService,
  ],
  exports:      [ LayoutComponent ],
  bootstrap:    [ LayoutComponent ],
})
export class MainModule { }
