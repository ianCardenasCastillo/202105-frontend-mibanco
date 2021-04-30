import { TestBed } from '@angular/core/testing';

import { BancoRipleyService } from './banco-ripley.service';

describe('BancoRipleyService', () => {
  let service: BancoRipleyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BancoRipleyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
