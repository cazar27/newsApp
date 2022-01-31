import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NewsListComponent } from './news-list/news-list.component';
import { NewsFormComponent } from './news-form/news-form.component';
import { NewsRouterModule } from './news-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    NewsListComponent,
    NewsFormComponent
  ],
  imports: [
    CommonModule,
    NewsRouterModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class NewsModule { }
