import { HomeComponent } from '../components/home/home.component';
import { WhyComponent } from '../components/why/why.component';
import { WhatComponent } from '../components/what/what.component';
import { WhenComponent } from '../components/when/when.component';

export var routes = [
  { path: '', component: HomeComponent },
  { path: 'who', component: HomeComponent },
  { path: 'why', component: WhyComponent },
  { path: 'what', component: WhatComponent },
  { path: 'when-where', component: WhenComponent },
];

