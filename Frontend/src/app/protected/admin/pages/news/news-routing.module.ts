import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsFormComponent } from './news-form/news-form.component';
import { NewsListComponent } from './news-list/news-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: NewsListComponent
      },
      {
        path: 'new',
        component: NewsFormComponent
      },

      {
        path: 'update/:id',
        component: NewsFormComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRouterModule { }
