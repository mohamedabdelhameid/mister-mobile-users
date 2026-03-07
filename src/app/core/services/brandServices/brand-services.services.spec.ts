import { TestBed } from '@angular/core/testing';

import { BrandServicesServices } from './brand-services.services';

describe('BrandServicesServices', () => {
  let service: BrandServicesServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandServicesServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
