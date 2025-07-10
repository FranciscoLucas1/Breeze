import { TestBed } from '@angular/core/testing';

import { ErrorService } from './erros.service';

describe('ErrosService', () => {
  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
