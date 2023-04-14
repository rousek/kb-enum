import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnumDetailComponent } from './enum-detail.component';

const routes: Routes = [
  {
    path: '',
    component: EnumDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnumDetailRoutingModule { }
