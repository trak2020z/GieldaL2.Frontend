import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticSidebarComponent } from './static-sidebar.component';

describe('StaticSidebarComponent', () => {
  let component: StaticSidebarComponent;
  let fixture: ComponentFixture<StaticSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
