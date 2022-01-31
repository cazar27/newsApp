import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/validator/validator.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(() => {
    const formBuilderStub = () => ({ name: 'pepe',email: 'pepe@mail.com',password: '123456',password2: '123456'});
    const validatorServiceStub = () => ({});
    const routerStub = () => ({ navigateByUrl: (string: any) => ({}) });
    const authServiceStub = () => ({
      register: (name:string, email:string, password:string, uuid:string) => ({ subscribe: (f: (arg0: {}) => any) => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RegisterComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: ValidatorService, useFactory: validatorServiceStub },
        { provide: Router, useFactory: routerStub },
        { provide: AuthService, useFactory: authServiceStub }
      ]
    });
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

});
