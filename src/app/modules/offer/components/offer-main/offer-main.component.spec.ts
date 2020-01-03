import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferMainComponent } from './offer-main.component';

describe('OfferMainComponent', () => {
  let component: OfferMainComponent;
  let fixture: ComponentFixture<OfferMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
