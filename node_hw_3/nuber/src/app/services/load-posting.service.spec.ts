import { TestBed } from '@angular/core/testing';

import { LoadPostingService } from './load-posting.service';

describe('LoadPostingService', () => {
  let service: LoadPostingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadPostingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
