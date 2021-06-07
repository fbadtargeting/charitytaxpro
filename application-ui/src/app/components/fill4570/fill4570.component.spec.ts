import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Fill4570Component } from './fill4570.component';

describe('Fill4570Component', () => {
  let component: Fill4570Component;
  let fixture: ComponentFixture<Fill4570Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Fill4570Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Fill4570Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
