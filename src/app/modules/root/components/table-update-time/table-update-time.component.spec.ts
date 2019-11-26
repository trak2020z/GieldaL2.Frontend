import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUpdateTimeComponent } from './table-update-time.component';

describe('TableUpdateTimeComponent', () => {
  let component: TableUpdateTimeComponent;
  let fixture: ComponentFixture<TableUpdateTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableUpdateTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableUpdateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
