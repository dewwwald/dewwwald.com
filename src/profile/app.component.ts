import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SidebarComponent } from './components/sidebar.component';

@Component({
  selector: 'dewwwald-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  template: `
    <div class="site-shell">
      <dewwwald-sidebar />
      <router-outlet />
    </div>
  `,
})
export class AppComponent {}
