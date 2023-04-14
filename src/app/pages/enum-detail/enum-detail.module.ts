import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnumDetailRoutingModule } from './enum-detail-routing.module';
import { EnumDetailComponent } from './enum-detail.component';
import { SharedModule } from '../../shared.module';


@NgModule({
  declarations: [
    EnumDetailComponent
  ],
  imports: [
    EnumDetailRoutingModule,
    SharedModule
  ],
  exports: [
    EnumDetailComponent
  ]
})
export class EnumDetailModule { }
