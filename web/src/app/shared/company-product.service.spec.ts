import { TestBed } from '@angular/core/testing';

import { CompanyProductService } from './company-product.service';

describe('CompanyProductService', () => {
  let service: CompanyProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
