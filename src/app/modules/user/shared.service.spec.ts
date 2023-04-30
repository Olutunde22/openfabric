import { TestBed } from '@angular/core/testing';

import { SharedService } from './shared.service';

describe('SharedService', () => {
  let service: SharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit error message', () => {
    service.sendErrorMessage('Error')
    service.errorMessage$.subscribe(message => {
      expect(message).toBe('Error')
    })
  })

});
