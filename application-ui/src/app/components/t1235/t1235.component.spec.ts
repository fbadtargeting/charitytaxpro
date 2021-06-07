import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { T1235Component } from './t1235.component';

describe('T1235Component', () => {
  let component: T1235Component;
  let fixture: ComponentFixture<T1235Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ T1235Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(T1235Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
