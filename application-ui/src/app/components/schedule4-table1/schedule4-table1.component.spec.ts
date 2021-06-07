import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Schedule4Table1Component } from './schedule4-table1.component';

describe('Schedule4Table1Component', () => {
  let component: Schedule4Table1Component;
  let fixture: ComponentFixture<Schedule4Table1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Schedule4Table1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Schedule4Table1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
