import { TestBed } from '@angular/core/testing';
import { ValidatorService } from './validator.service';

describe('ValidatorService', () => {
  let service: ValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ValidatorService] });
    service = TestBed.inject(ValidatorService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it(`namePattern has default value`, () => {
    expect(service.namePattern).toEqual(`([a-zA-Z]+)`);
  });

  it(`emailPattern has default value`, () => {
    expect(service.emailPattern).toEqual(
      `^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$`
    );
  });

  it(`passwordPattern has default value`, () => {
    expect(service.passwordPattern).toEqual(`[0-9]{6}`);
  });


});
