import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { TestingHelper } from '../_helpers/testing.spec';

describe('UserService', () => {
  let service: UserService;
  
  beforeEach(() => {
    TestingHelper.configureTest();
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
