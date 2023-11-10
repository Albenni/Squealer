import { TestBed } from '@angular/core/testing';

import { GeolocatioNService } from './geolocation.service';

describe('GeolocatioNService', () => {
  let service: GeolocatioNService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeolocatioNService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
