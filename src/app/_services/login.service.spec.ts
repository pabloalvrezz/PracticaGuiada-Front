import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { TestingHelper } from '../_helpers/testing.spec';

describe('LoginService', () => {
  let service: LoginService;
  
  beforeEach(() => {
    TestingHelper.configureTest();
    service = TestBed.inject(LoginService);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
