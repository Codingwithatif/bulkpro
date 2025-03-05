import { TestBed } from '@angular/core/testing';

import { CompanySalesService } from './company-sales.service';

describe('CompanySalesService', () => {
  let service: CompanySalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanySalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
