import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { T1236Component } from './t1236.component';

describe('T1236Component', () => {
  let component: T1236Component;
  let fixture: ComponentFixture<T1236Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ T1236Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(T1236Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
