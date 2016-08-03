import { bootstrap } from '@angular/platform-browser-dynamic';
import { LayoutComponent } from './components/layout/layout.component';
import { APP_ROUTER_PROVIDER } from './config/app.routes';

bootstrap(LayoutComponent, [
  APP_ROUTER_PROVIDER
])
.catch(err => console.error(err));
