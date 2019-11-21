import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSellOffersComponent } from './user-sell-offers.component';

describe('UserSellOffersComponent', () => {
  let component: UserSellOffersComponent;
  let fixture: ComponentFixture<UserSellOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSellOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSellOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
