import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { MainContentComponent } from '../../shared/main-content/main-content.component';
import { FullHeightDirective } from '../../shared/directives/full-height.directive';
import { FullPageDirective } from '../../shared/directives/full-page.directive';
import { WindowService } from '../../shared/services/window.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app/components/layout/layout.component.html',
  providers: [
    WindowService
  ],
  directives: [
    ROUTER_DIRECTIVES,
    FullHeightDirective,
    FullPageDirective,
    SidebarComponent,
    MainContentComponent,
  ]
})

export class LayoutComponent {}
