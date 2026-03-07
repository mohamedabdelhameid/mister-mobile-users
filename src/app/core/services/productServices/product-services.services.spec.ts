import { TestBed } from '@angular/core/testing';

import { ProductServicesServices } from './product-services.services';

describe('ProductServicesServices', () => {
  let service: ProductServicesServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductServicesServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
