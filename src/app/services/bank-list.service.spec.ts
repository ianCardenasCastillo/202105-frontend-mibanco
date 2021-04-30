import { TestBed } from '@angular/core/testing';

import { BankListService } from './bank-list.service';

describe('BankListService', () => {
  let service: BankListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
