import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/services/auth.service';
import { NewsService } from '../admin/pages/news/services/news.service';
import { User } from 'src/app/auth/interfaces/user.interface';
import { News } from '../admin/pages/news/interfaces/news.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  public newsList: News [] = [];

  get user(): string | null {
    return localStorage.getItem('nameUser');
  }

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _newsService: NewsService
  ) {
    this._newsService.getNews()
    .subscribe(resp => {
      if (resp) {
        this.newsList = resp.news;
      } else {
        console.warn("Hubo un error");
      }
    });
  }

  public logout(): void {
    this._authService.logout();
    this._router.navigateByUrl('auth/');
  }

}
