import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { T2081Component } from './t2081.component';

describe('T2081Component', () => {
  let component: T2081Component;
  let fixture: ComponentFixture<T2081Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ T2081Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(T2081Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
