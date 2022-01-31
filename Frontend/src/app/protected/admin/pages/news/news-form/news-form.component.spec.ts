import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NewsService } from '../services/news.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NewsFormComponent } from './news-form.component';

describe('NewsFormComponent', () => {
  let component: NewsFormComponent;
  let fixture: ComponentFixture<NewsFormComponent>;

  beforeEach(() => {
    const formBuilderStub = () => ({});
    const activatedRouteStub = () => ({ params: { subscribe: (f: (arg0: {}) => any) => f({}) } });
    const routerStub = () => ({ navigateByUrl: (string: any) => ({}) });
    const locationStub = () => ({ back: () => ({}) });
    const newsServiceStub = () => ({
      getNewById: (id: string) => ({ subscribe: (f: (arg0: {}) => string) => f({}) }),
      updateNew: (title: string, description: string, newsUuid: string) => ({ subscribe: (f: (arg0: {}) => any) => f({}) }),
      newNew: (title: string, description: string, newsUuid: string) => ({ subscribe: (f: (arg0: {}) => any) => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NewsFormComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: Location, useFactory: locationStub },
        { provide: NewsService, useFactory: newsServiceStub }
      ]
    });
    fixture = TestBed.createComponent(NewsFormComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`update has default value`, () => {
    expect(component.update).toEqual(false);
  });

  it(`messageBtn has default value`, () => {
    expect(component.messageBtn).toEqual(`Registrar Noticia`);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const newsServiceStub: NewsService = fixture.debugElement.injector.get(
        NewsService
      );
      spyOn(newsServiceStub, 'getNewById').and.callThrough();
      component.ngOnInit();
      expect(newsServiceStub.getNewById).toHaveBeenCalled();
    });
  });

  describe('goBack', () => {
    it('makes expected calls', () => {
      const locationStub: Location = fixture.debugElement.injector.get(
        Location
      );
      spyOn(locationStub, 'back').and.callThrough();
      component.goBack();
      expect(locationStub.back).toHaveBeenCalled();
    });
  });
});
