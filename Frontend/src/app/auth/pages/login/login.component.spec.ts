import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidatorService } from 'src/app/shared/validator/validator.service';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    const formBuilderStub = () => ({mail: 'usuario@mail.com', password: '123456'});
    const routerStub = () => ({ navigateByUrl: (string: any) => ({}) });
    const authServiceStub = () => ({
      login: (email: string, password: string) => ({ subscribe: (f: (arg0: {}) => any) => f({}) })
    });
    const validatorServiceStub = () => ({});
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: Router, useFactory: routerStub },
        { provide: AuthService, useFactory: authServiceStub },
        { provide: ValidatorService, useFactory: validatorServiceStub }
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('Test Login ngOnInit', () => {
    const spy = spyOn(component,'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  describe('login', () => {
    it('Test Login login', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const authServiceStub: AuthService = fixture.debugElement.injector.get(
        AuthService
      );
      const spy = spyOn(routerStub, 'navigateByUrl').and.callThrough();
      const spy1 = spyOn(authServiceStub, 'login').and.callThrough();
      const spy2 = spyOn(component,'login').and.callThrough();

      component.login();

      expect(spy).toHaveBeenCalled();
      expect(spy1).toHaveBeenCalled();
      expect(spy2).toHaveBeenCalled();
    });
  });
});
