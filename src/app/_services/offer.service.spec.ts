import { TestBed } from '@angular/core/testing';

import { OffersService } from './offer.service';

describe('BuyOfferService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OffersService = TestBed.get(OffersService);
    expect(service).toBeTruthy();
  });
});
