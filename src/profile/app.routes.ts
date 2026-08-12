import { Routes } from '@angular/router';

import { ProfilePageComponent } from './components/profile-page.component';
import { ResumePageComponent } from './components/resume-page.component';
import { ArticlesComponent } from './components/articles.component';

export const routes: Routes = [
  { path: 'about', component: ProfilePageComponent, title: 'dewwwald | about' },
  { path: 'writing', pathMatch: 'full', redirectTo: '/articles' },
  { path: 'experience', component: ProfilePageComponent, title: 'dewwwald | experience' },
  { path: 'contact', component: ProfilePageComponent, title: 'dewwwald | contact' },
  { path: 'who', pathMatch: 'full', redirectTo: '/about' },
  { path: 'what', pathMatch: 'full', redirectTo: '/about' },
  { path: 'why', pathMatch: 'full', redirectTo: '/experience' },
  { path: 'when-where', pathMatch: 'full', redirectTo: '/contact' },
  { path: 'articles', pathMatch: 'full', component: ArticlesComponent, title: 'dewwwald | writing' },
  {
    path: 'articles/:slug',
    title: 'dewwwald | writing',
    // Lazy-loaded: this is the only page that needs marked + mermaid, and mermaid
    // alone is heavy enough to blow the app's initial bundle budget if it's eager.
    loadComponent: () => import('./components/article-post-page.component').then((m) => m.ArticlePostPageComponent),
  },
  { path: 'blog', pathMatch: 'full', redirectTo: '/about' },
  { path: 'resume', pathMatch: 'full', redirectTo: '/resume/technical' },
  { path: 'resume/:type', component: ResumePageComponent, title: 'dewwwald | resume' },
  { path: '', pathMatch: 'full', redirectTo: '/about' },
  { path: '**', redirectTo: '/about' },
];
