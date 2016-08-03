import { RouterConfig, provideRouter } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { WhyComponent } from '../components/why/why.component';
import { WhatComponent } from '../components/what/what.component';
import { WhereComponent } from '../components/where/where.component';
import { WhenComponent } from '../components/when/when.component';

export const routes: RouterConfig = [
  { path: '', component: HomeComponent },
  { path: 'who', component: HomeComponent },
  { path: 'why', component: WhyComponent },
  { path: 'what', component: WhatComponent },
  { path: 'where', component: WhereComponent },
  { path: 'when', component: WhenComponent },
];

export const APP_ROUTER_PROVIDER = [
  provideRouter(routes)
];
