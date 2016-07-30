import { Component } from '@angular/core';

import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { MainContentComponent } from '../../shared/main-content/main-content.component';
import { FullHeightDirective } from '../../shared/grow-sections/full-height.directive';
import { FullPageDirective } from '../../shared/grow-sections/full-page.directive';
import { WindowService } from '../../services/window.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app/components/layout/layout.component.html',
  providers: [
    WindowService
  ],
  directives: [
    FullHeightDirective,
    FullPageDirective,
    SidebarComponent,
    MainContentComponent
  ]
})

export class LayoutComponent {}
