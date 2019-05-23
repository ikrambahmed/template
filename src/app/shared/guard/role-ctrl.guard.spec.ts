import { TestBed, async, inject } from '@angular/core/testing';

import { RoleCTRLGuard } from './role-ctrl.guard';

describe('RoleCTRLGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleCTRLGuard]
    });
  });

  it('should ...', inject([RoleCTRLGuard], (guard: RoleCTRLGuard) => {
    expect(guard).toBeTruthy();
  }));
});
