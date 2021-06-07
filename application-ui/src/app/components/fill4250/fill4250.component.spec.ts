import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Fill4250Component } from './fill4250.component';

describe('Fill4250Component', () => {
  let component: Fill4250Component;
  let fixture: ComponentFixture<Fill4250Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Fill4250Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Fill4250Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
