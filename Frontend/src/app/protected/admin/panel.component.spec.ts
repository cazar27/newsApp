import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { PanelComponent } from './panel.component';

describe('PanelComponent', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigateByUrl: (string: any) => ({}) });
    const authServiceStub = () => ({ logout: () => ({}) });
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PanelComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: AuthService, useFactory: authServiceStub }
      ]
    });
    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('logout', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const authServiceStub: AuthService = fixture.debugElement.injector.get(
        AuthService
      );
      spyOn(routerStub, 'navigateByUrl').and.callThrough();
      spyOn(authServiceStub, 'logout').and.callThrough();
      component.logout();
      expect(routerStub.navigateByUrl).toHaveBeenCalled();
      expect(authServiceStub.logout).toHaveBeenCalled();
    });
  });
});
