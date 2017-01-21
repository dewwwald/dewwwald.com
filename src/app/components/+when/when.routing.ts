import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhenComponent } from './when.component';

const routes: Routes = [
  { path: '', component: WhenComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhenRoutingModule { }
