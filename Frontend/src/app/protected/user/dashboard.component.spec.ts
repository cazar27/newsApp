import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { NewsService } from '../admin/pages/news/services/news.service';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigateByUrl: (string: any) => ({}) });
    const authServiceStub = () => ({ logout: () => ({}) });
    const newsServiceStub = () => ({
      getNews: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DashboardComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: AuthService, useFactory: authServiceStub },
        { provide: NewsService, useFactory: newsServiceStub }
      ]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`newsList has default value`, () => {
    expect(component.newsList).toEqual([]);
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
