import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Schedule1Component } from './schedule1.component';

describe('Schedule1Component', () => {
  let component: Schedule1Component;
  let fixture: ComponentFixture<Schedule1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Schedule1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Schedule1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
