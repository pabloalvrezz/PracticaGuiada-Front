import { TestBed } from '@angular/core/testing';

import { MenuService } from './menu.service';
import { TestingHelper } from '../_helpers/testing.spec';

describe('MenuService', () => {
  let service: MenuService;
  
  beforeEach(() => {
    TestingHelper.configureTest();
    service = TestBed.inject(MenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
