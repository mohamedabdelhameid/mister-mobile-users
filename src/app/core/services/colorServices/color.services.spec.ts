import { TestBed } from '@angular/core/testing';

import { ColorServices } from './color.services';

describe('ColorServices', () => {
  let service: ColorServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
