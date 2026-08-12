import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SiteFooterComponent } from './components/site-footer.component';

@Component({
  selector: 'dewwwald-root',
  standalone: true,
  imports: [RouterOutlet, SiteFooterComponent],
  template: `
    <div class="site-shell">
      <router-outlet />
      <dewwwald-site-footer />
    </div>
  `,
})
export class AppComponent {}
