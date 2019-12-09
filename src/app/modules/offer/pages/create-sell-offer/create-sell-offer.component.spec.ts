import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSellOfferComponent } from './create-sell-offer.component';

describe('CreateSellOfferComponent', () => {
  let component: CreateSellOfferComponent;
  let fixture: ComponentFixture<CreateSellOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSellOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSellOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
