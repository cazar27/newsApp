import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate, CanLoad {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validLogin();;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validLogin();;
  }

  private validLogin(): boolean {
    const valid: boolean = this._authService.loginValidate('ADMIN_ROLE');
    if(!valid) {
      this._router.navigateByUrl('/auth/login');
    }
    return valid;
  }
}
