import { TestBed } from '@angular/core/testing';

import { CompanyInventoryService } from './company-inventory.service';

describe('CompanyInventoryService', () => {
  let service: CompanyInventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyInventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
