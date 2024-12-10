import { TestBed } from '@angular/core/testing';

import { GoogleAccountApiService } from './google-account-api.service';

describe('GoogleAccountApiService', () => {
  let service: GoogleAccountApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleAccountApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
