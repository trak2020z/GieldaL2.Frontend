import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBuyOffersComponent } from './user-buy-offers.component';

describe('UserBuyOffersComponent', () => {
  let component: UserBuyOffersComponent;
  let fixture: ComponentFixture<UserBuyOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBuyOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBuyOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
