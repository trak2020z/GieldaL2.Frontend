import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MatTableModule } from '@angular/material/table';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule
      ],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create table with header', () => {
    fixture.detectChanges();

    let tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBeGreaterThanOrEqual(1);

    let headerRow = tableRows[0];
    expect(headerRow.cells[0].innerHTML.trim()).toBe('Name');
    expect(headerRow.cells[1].innerHTML.trim()).toBe('Value');
    expect(headerRow.cells[2].innerHTML.trim()).toBe('Change');
  })

});
