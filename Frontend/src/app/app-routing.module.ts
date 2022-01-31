import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from './guards/admin.guard';
import { UserAuthGuard } from './guards/user.guard';
import { DashboardComponent } from './protected/user/dashboard.component';

const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [UserAuthGuard],
    canLoad: [UserAuthGuard]
  },
  {
    path: 'panel-admin',
    loadChildren: () => import('./protected/protected.module').then( m => m.ProtectedModule ),
    canActivate: [AdminAuthGuard],
    canLoad: [AdminAuthGuard]
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
