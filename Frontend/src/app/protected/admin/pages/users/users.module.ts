import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersRouterModule } from './users-routing.module';

@NgModule({
  declarations: [
    UsersListComponent
  ],
  imports: [
    CommonModule,
    UsersRouterModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UsersModule { }
