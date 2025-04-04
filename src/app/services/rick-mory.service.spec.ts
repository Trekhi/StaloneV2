import { TestBed } from '@angular/core/testing';

import { RickMoryService } from './rick-mory.service';

describe('RickMoryService', () => {
  let service: RickMoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RickMoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
