import { TestBed } from '@angular/core/testing';

import { PlanningClientUtilsService } from './planning-client-utils.service';

describe('PlanningClientUtilsService', () => {
  let service: PlanningClientUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanningClientUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
