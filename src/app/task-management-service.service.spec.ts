import { TestBed } from '@angular/core/testing';

import { TaskManagementServiceService } from './task-management-service.service';

describe('TaskManagementServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskManagementServiceService = TestBed.get(TaskManagementServiceService);
    expect(service).toBeTruthy();
  });
});
