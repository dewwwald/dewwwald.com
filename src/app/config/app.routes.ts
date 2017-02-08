export var routes = [
  { path: 'who', loadChildren: '../components/+home/home.module#HomeModule' },
  { path: 'why', loadChildren: '../components/+why/why.module#WhyModule' },
  { path: 'what', loadChildren: '../components/+what/what.module#WhatModule' },
  { path: 'when-where', loadChildren: '../components/+when/when.module#WhenModule' },
  { path: '', redirectTo: '/who', pathMatch: 'prefix' },
];

