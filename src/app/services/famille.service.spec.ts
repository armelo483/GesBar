import { TestBed } from '@angular/core/testing';

import { FamilleService } from './famille.service';

describe('FamilleService', () => {
  let service: FamilleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
