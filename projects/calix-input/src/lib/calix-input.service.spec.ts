import { TestBed } from '@angular/core/testing';

import { CalixInputService } from './calix-input.service';

describe('CalixInputService', () => {
  let service: CalixInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalixInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
