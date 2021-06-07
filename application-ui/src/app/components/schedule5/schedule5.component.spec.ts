import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Schedule5Component } from './schedule5.component';

describe('Schedule5Component', () => {
  let component: Schedule5Component;
  let fixture: ComponentFixture<Schedule5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Schedule5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Schedule5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
