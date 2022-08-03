import { TestBed } from '@angular/core/testing';

import { SubFamilleService } from './sub-famille.service';

describe('SubFamilleService', () => {
  let service: SubFamilleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubFamilleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
