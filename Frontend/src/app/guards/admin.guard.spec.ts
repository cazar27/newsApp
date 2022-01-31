import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Route } from '@angular/router';
import { Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { AdminAuthGuard } from './admin.guard';

describe('AdminAuthGuard', () => {
  let service: AdminAuthGuard;

  beforeEach(() => {
    const routerStub = () => ({ navigateByUrl: (string: any) => ({}) });
    const authServiceStub = () => ({ loginValidate: (string: any) => ({}) });
    TestBed.configureTestingModule({
      providers: [
        AdminAuthGuard,
        { provide: Router, useFactory: routerStub },
        { provide: AuthService, useFactory: authServiceStub }
      ]
    });
    service = TestBed.inject(AdminAuthGuard);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
