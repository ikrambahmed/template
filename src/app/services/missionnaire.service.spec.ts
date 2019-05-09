import { TestBed, inject } from '@angular/core/testing';

import { MissionnaireService } from './missionnaire.service';

describe('MissionnaireService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MissionnaireService]
    });
  });

  it('should be created', inject([MissionnaireService], (service: MissionnaireService) => {
    expect(service).toBeTruthy();
  }));
});
