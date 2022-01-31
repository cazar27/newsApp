import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './user/dashboard.component';
import { PanelComponent } from './admin/panel.component';

import { MainComponent } from './admin/pages/main/main.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    PanelComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    SharedModule
  ]
})
export class ProtectedModule { }
