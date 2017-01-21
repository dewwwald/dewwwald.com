import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhyComponent } from './why.component';

const routes: Routes = [
  { path: '', component: WhyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhyRoutingModule { }
