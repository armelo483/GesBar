import { TestBed } from '@angular/core/testing';

import { RavitaillementService } from './ravitaillement.service';

describe('RavitaillementService', () => {
  let service: RavitaillementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RavitaillementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
