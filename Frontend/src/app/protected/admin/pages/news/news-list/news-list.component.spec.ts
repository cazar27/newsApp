import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NewsService } from '../services/news.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NewsListComponent } from './news-list.component';

describe('NewsListComponent', () => {
  let component: NewsListComponent;
  let fixture: ComponentFixture<NewsListComponent>;

  beforeEach(() => {
    const routerStub = () => ({});
    const locationStub = () => ({ back: () => ({}) });
    const newsServiceStub = () => ({
      getNews: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }),
      deleteNew: (id: any) => ({ subscribe: (f: (arg0: {}) => any) => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NewsListComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: Location, useFactory: locationStub },
        { provide: NewsService, useFactory: newsServiceStub }
      ]
    });
    fixture = TestBed.createComponent(NewsListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`newsList has default value`, () => {
    expect(component.newsList).toEqual([]);
  });

  it(`isLoading has default value`, () => {
    expect(component.isLoading).toEqual(true);
  });

  it(`displayedColumns has default value`, () => {
    expect(component.displayedColumns).toEqual([]);
  });

  it(`columns has default value`, () => {
    expect(component.columns).toEqual([]);
  });

  it(`resultsLength has default value`, () => {
    expect(component.resultsLength).toEqual(0);
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
