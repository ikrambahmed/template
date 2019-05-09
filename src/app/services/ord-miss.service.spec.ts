import { TestBed, inject } from '@angular/core/testing';

import { OrdMissService } from './ord-miss.service';

describe('OrdMissService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdMissService]
    });
  });

  it('should be created', inject([OrdMissService], (service: OrdMissService) => {
    expect(service).toBeTruthy();
  }));
});
