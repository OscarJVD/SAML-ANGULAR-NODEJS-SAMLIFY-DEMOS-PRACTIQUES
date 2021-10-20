import { TestBed } from '@angular/core/testing';

import { SamlOptService } from './saml-opt.service';

describe('SamlOptService', () => {
  let service: SamlOptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SamlOptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
