import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnumListComponent } from './enum-list.component';

const routes: Routes = [
  {
    path: '',
    component: EnumListComponent,
    children: [
      {
        path: ':enumName',
        loadChildren: () => import('../enum-detail/enum-detail.module').then(m => m.EnumDetailModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnumListRoutingModule { }
