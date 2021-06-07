import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Schedule3Component } from './schedule3.component';

describe('Schedule3Component', () => {
  let component: Schedule3Component;
  let fixture: ComponentFixture<Schedule3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Schedule3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Schedule3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
