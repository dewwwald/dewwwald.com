import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { MainContentComponent } from '../../shared/main-content/main-content.component';
import { WindowService } from '../../shared/services/window.service';

@Component({
  selector: 'main',
  templateUrl: 'app/components/home/home.component.html',
  providers: [
    WindowService
  ]
})
export class HomeComponent { }
