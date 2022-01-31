import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
  });

  it('Test AuthService getUsers', () => {
    spyOn(service,"getUsers");
    service.getUsers();
    expect(service.getUsers).toHaveBeenCalled();
  });

  it('Test AuthService user', () => {
    service.user;
    expect(service.user).toHaveBeenCalled();
  });

  it('Test AuthService login', () => {
    spyOn(service,"login");
    service.login('usuario@mail.com','123456');
    expect(service.login('','')).toHaveBeenCalled();
  });
});
