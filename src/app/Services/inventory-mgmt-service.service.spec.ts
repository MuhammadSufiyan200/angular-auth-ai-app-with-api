import { TestBed } from '@angular/core/testing';

import { InventoryMgmtServiceService } from './inventory-mgmt-service.service';

describe('InventoryMgmtServiceService', () => {
  let service: InventoryMgmtServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryMgmtServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
