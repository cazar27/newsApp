import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Route } from '@angular/router';
import { Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { UserAuthGuard } from './user.guard';

describe('UserAuthGuard', () => {
  let service: UserAuthGuard;

  beforeEach(() => {
    const routerStub = () => ({ navigateByUrl: (string: any) => ({}) });
    const authServiceStub = () => ({});
    TestBed.configureTestingModule({
      providers: [
        UserAuthGuard,
        { provide: Router, useFactory: routerStub },
        { provide: AuthService, useFactory: authServiceStub }
      ]
    });
    service = TestBed.inject(UserAuthGuard);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
