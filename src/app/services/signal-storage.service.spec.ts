import { TestBed } from '@angular/core/testing';

import { SignalStorageService } from './signal-storage.service';

describe('SignalStorageService', () => {
  let service: SignalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
