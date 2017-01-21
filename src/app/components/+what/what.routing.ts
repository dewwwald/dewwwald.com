import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhatComponent } from './what.component';

const routes: Routes = [
  { path: '', component: WhatComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhatRoutingModule { }
