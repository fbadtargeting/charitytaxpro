import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { T3010Component } from './t3010.component';

describe('T3010Component', () => {
  let component: T3010Component;
  let fixture: ComponentFixture<T3010Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ T3010Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(T3010Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
