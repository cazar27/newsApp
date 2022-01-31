import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from '../guards/admin.guard';
import { MainComponent } from './admin/pages/main/main.component';
import { PanelComponent } from './admin/panel.component';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    children: [
      {
        path: '',
        component: MainComponent,
        canActivate: [AdminAuthGuard],
        canLoad: [AdminAuthGuard]
      },
      {
        path: 'news',
        loadChildren: () => import('./admin/pages/news/news.module').then( m => m.NewsModule ),
      },
      {
        path: 'users',
        loadChildren: () => import('./admin/pages/users/users.module').then( m => m.UsersModule ),
      },
      {
        path: '**',
        redirectTo: ''
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
