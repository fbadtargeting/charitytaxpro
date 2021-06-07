import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Schedule4Table2Component } from './schedule4-table2.component';

describe('Schedule4Table2Component', () => {
  let component: Schedule4Table2Component;
  let fixture: ComponentFixture<Schedule4Table2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Schedule4Table2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Schedule4Table2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
