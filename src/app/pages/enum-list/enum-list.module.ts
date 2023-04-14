import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnumListRoutingModule } from './enum-list-routing.module';
import { EnumListComponent } from './enum-list.component';
import { SharedModule } from '../../shared.module';


@NgModule({
  declarations: [
    EnumListComponent
  ],
  imports: [
    EnumListRoutingModule,
    SharedModule
  ],
  exports: [ EnumListComponent ]
})
export class EnumListModule { }
