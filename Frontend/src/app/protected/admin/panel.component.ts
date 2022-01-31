import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/services/auth.service';
import { User } from 'src/app/auth/interfaces/user.interface';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {

  get user(): string | null {
    return localStorage.getItem('nameUser');
  }

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  public logout(): void {
    this._authService.logout();
    this._router.navigateByUrl('auth/');
  }

}
