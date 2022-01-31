import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../../../../../auth/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersListComponent } from './users-list.component';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(() => {
    const locationStub = () => ({ back: () => ({}) });
    const authServiceStub = () => ({
      getUsers: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }),
      user2Admin: (id: any) => ({ subscribe: (f: (arg0: {}) => any) => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UsersListComponent],
      providers: [
        { provide: Location, useFactory: locationStub },
        { provide: AuthService, useFactory: authServiceStub }
      ]
    });
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`userList has default value`, () => {
    expect(component.userList).toEqual([]);
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
