import { Routes } from '@angular/router';

import { ProfilePageComponent } from './components/profile-page.component';

export const routes: Routes = [
  { path: 'who', component: ProfilePageComponent, title: 'dewwwald | who' },
  { path: 'what', component: ProfilePageComponent, title: 'dewwwald | what' },
  { path: 'articles', pathMatch: 'full', redirectTo: 'what' },
  { path: 'why', component: ProfilePageComponent, title: 'dewwwald | why' },
  { path: 'when-where', component: ProfilePageComponent, title: 'dewwwald | when and where' },
  { path: '', pathMatch: 'full', redirectTo: 'who' },
  { path: '**', redirectTo: 'who' },
];
